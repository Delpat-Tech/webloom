import mongoose from 'mongoose';
import connectDB from '../lib/db';
import PortfolioProject, { IPortfolioProject } from '../lib/models/PortfolioProject';
import { portfolioItems } from '../data/portfolio-data';

interface CRMProjectDoc {
  _id?: any;
  slug?: string;
  identity?: {
    title?: string;
    client?: any;
  };
  showcase?: {
    is_featured?: boolean;
    is_subscribed?: boolean;
    story?: {
      problem?: string;
      solution?: string;
    };
    tech_stack?: {
      platforms?: string[];
      backend?: string[];
    };
    metrics?: Array<{
      value?: string;
      label?: string;
    }>;
  };
  industries?: string[];
  meta?: {
    portfolio_id?: string;
    board_id?: string;
  };
}

interface CRMClientDoc {
  _id?: any;
  name?: string;
  location?: string;
}

function stableStringify(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val !== 'object') return String(val);
  if (Array.isArray(val)) return `[${val.map(stableStringify).join(',')}]`;
  const keys = Object.keys(val).sort();
  return `{${keys.map((k) => `${k}:${stableStringify(val[k])}`).join(',')}}`;
}

async function seedPortfolioProjects() {
  const isDryRun = process.argv.includes('--dry-run') || process.env.DRY_RUN === 'true';

  console.log('====================================================');
  console.log(
    isDryRun
      ? '🔍 RUNNING PORTFOLIO SEED IN DRY-RUN MODE (NO DB WRITES)'
      : '🚀 RUNNING PORTFOLIO SEED (UPSERT MODE)'
  );
  console.log('====================================================\n');

  try {
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection instance not available.');
    }

    // 1. Fetch CRM Projects and Clients (Source A)
    let crmProjects: CRMProjectDoc[] = [];
    let crmClientsMap = new Map<string, CRMClientDoc>();

    try {
      const rawClients = await db.collection('clients').find({}).toArray();
      for (const client of rawClients) {
        crmClientsMap.set(String(client._id), client);
      }

      const rawProjects = await db.collection('projects').find({}).toArray();
      crmProjects = rawProjects as CRMProjectDoc[];
      console.log(`📦 Loaded ${crmProjects.length} CRM Projects and ${rawClients.length} CRM Clients from database.`);
    } catch (e) {
      console.warn('⚠️ Could not query CRM projects/clients collections, proceeding with hardcoded items:', e);
    }

    // Build CRM projects map by slug / portfolio_id
    const crmProjectsBySlug = new Map<string, CRMProjectDoc>();
    for (const p of crmProjects) {
      const slugKey = p.slug || p.meta?.portfolio_id;
      if (slugKey) {
        crmProjectsBySlug.set(slugKey.trim().toLowerCase(), p);
      }
    }

    // 2. Fetch existing PortfolioProject documents from MongoDB
    const existingPortfolioDocs = await PortfolioProject.find({}).lean();
    const existingDocsMap = new Map<string, any>();
    for (const doc of existingPortfolioDocs) {
      if (doc.id) {
        existingDocsMap.set(doc.id.toLowerCase(), doc);
      }
    }
    console.log(`📦 Loaded ${existingPortfolioDocs.length} existing portfolio documents from 'portfolioprojects' collection.\n`);

    // 3. Prepare merged items dictionary
    // Map key: slug/id -> Final IPortfolioProject payload
    const mergedItemsMap = new Map<string, Partial<IPortfolioProject>>();

    // Step A: Process 35 Webloom Hardcoded Items (Source B)
    for (const rawItem of portfolioItems) {
      const itemKey = rawItem.id.trim().toLowerCase();
      const matchedCrm = crmProjectsBySlug.get(itemKey);

      const mergedItem: Partial<IPortfolioProject> = {
        ...rawItem,
        is_subscribed: rawItem.is_subscribed ?? false,
      };

      // If CRM has this project with showcase flags, honor CRM's is_featured / is_subscribed
      if (matchedCrm?.showcase) {
        if (matchedCrm.showcase.is_featured !== undefined) {
          mergedItem.meta = {
            ...mergedItem.meta!,
            featured: Boolean(matchedCrm.showcase.is_featured),
          };
        }
        if (matchedCrm.showcase.is_subscribed !== undefined) {
          mergedItem.is_subscribed = Boolean(matchedCrm.showcase.is_subscribed);
        }
      }

      mergedItemsMap.set(itemKey, mergedItem);
    }

    // Step B: Process CRM Projects not in Webloom Hardcoded List (Source A only)
    for (const crmProj of crmProjects) {
      const slugKey = (crmProj.slug || crmProj.meta?.portfolio_id || '').trim().toLowerCase();
      if (!slugKey) continue;

      // Only include CRM projects that have showcase content or are featured if not already in webloom list
      const hasShowcase =
        crmProj.showcase?.is_featured ||
        Boolean(crmProj.showcase?.story?.problem) ||
        Boolean(crmProj.showcase?.story?.solution);

      if (!mergedItemsMap.has(slugKey) && hasShowcase) {
        const clientRef = crmProj.identity?.client;
        const clientObj = clientRef ? crmClientsMap.get(String(clientRef)) : undefined;
        const clientName = clientObj?.name || 'Delpat Partner';
        const clientLoc = clientObj?.location || undefined;

        const problemText =
          crmProj.showcase?.story?.problem ||
          'Delpat worked with the client to engineer and execute this high-impact solution.';
        const solutionText =
          crmProj.showcase?.story?.solution ||
          'Comprehensive technical execution and architecture delivered on schedule.';

        const headlineVal = crmProj.showcase?.metrics?.[0]?.value || '100%';
        const headlineLbl = crmProj.showcase?.metrics?.[0]?.label || 'Project Completion Rate';

        const crmDerivedItem: Partial<IPortfolioProject> = {
          id: slugKey,
          cardTitle: `${crmProj.identity?.title || 'Featured Project'}: ${solutionText.slice(0, 55).trim()}...`,
          client: {
            name: clientName,
            location: clientLoc,
            publiclyUsable: true,
          },
          is_subscribed: Boolean(crmProj.showcase?.is_subscribed ?? false),
          relationship: {
            status: 'First Project',
            summary: 'Client partnership with Delpat.',
          },
          story: {
            problem: problemText,
            impact: {},
          },
          execution: {
            coreMandate: solutionText,
            smartMoment: 'Engineered a streamlined, scalable system tailored to operational requirements.',
            features: [
              'Custom end-to-end implementation',
              'Integrated workflow & data pipelines',
              'Performance optimization & testing',
            ],
          },
          outcome: {
            headlineMetric: {
              value: headlineVal,
              label: headlineLbl,
              icon: 'check',
            },
            qualitativeWins: [
              'Unblocked key operational bottlenecks.',
              'Delivered production-grade stability.',
            ],
          },
          meta: {
            persona: 'Karan',
            serviceTrack: 'Custom',
            featured: Boolean(crmProj.showcase?.is_featured ?? false),
            tags: crmProj.industries || [],
            links: {
              caseStudy: `/proof/${slugKey}`,
            },
          },
          techStack: {
            platforms: crmProj.showcase?.tech_stack?.platforms || [],
            backend: crmProj.showcase?.tech_stack?.backend || [],
          },
        };

        mergedItemsMap.set(slugKey, crmDerivedItem);
      }
    }

    console.log(`📊 Total combined unique portfolio items to process: ${mergedItemsMap.size}\n`);

    let createdCount = 0;
    let updatedCount = 0;
    let unchangedCount = 0;

    for (const [idKey, itemPayload] of mergedItemsMap.entries()) {
      const existingDoc = existingDocsMap.get(idKey);

      if (!existingDoc) {
        createdCount++;
        console.log(`  ➕ [INSERT] ${itemPayload.id} (${itemPayload.client?.name}) - featured: ${itemPayload.meta?.featured}`);
        if (!isDryRun) {
          await PortfolioProject.create(itemPayload);
        }
      } else {
        // Check if there are meaningful differences
        const isDiff =
          existingDoc.cardTitle !== itemPayload.cardTitle ||
          Boolean(existingDoc.meta?.featured) !== Boolean(itemPayload.meta?.featured) ||
          Boolean(existingDoc.is_subscribed) !== Boolean(itemPayload.is_subscribed) ||
          existingDoc.client?.name !== itemPayload.client?.name ||
          existingDoc.story?.problem !== itemPayload.story?.problem ||
          existingDoc.execution?.coreMandate !== itemPayload.execution?.coreMandate ||
          existingDoc.outcome?.headlineMetric?.value !== itemPayload.outcome?.headlineMetric?.value ||
          existingDoc.outcome?.headlineMetric?.label !== itemPayload.outcome?.headlineMetric?.label ||
          (itemPayload.meta?.tags && JSON.stringify(existingDoc.meta?.tags || []) !== JSON.stringify(itemPayload.meta?.tags || []));

        if (isDiff) {
          updatedCount++;
          console.log(`  🔄 [UPDATE] ${itemPayload.id} (${itemPayload.client?.name}) - featured: ${itemPayload.meta?.featured}`);
          if (!isDryRun) {
            await PortfolioProject.findOneAndUpdate(
              { id: itemPayload.id },
              { $set: itemPayload },
              { upsert: true, new: true }
            );
          }
        } else {
          unchangedCount++;
          console.log(`  ✔️  [UNCHANGED] ${itemPayload.id}`);
        }
      }
    }

    console.log('\n----------------------------------------------------');
    console.log('📋 SUMMARY REPORT:');
    console.log(`   - New Inserts:    ${createdCount}`);
    console.log(`   - Updates:        ${updatedCount}`);
    console.log(`   - Unchanged:      ${unchangedCount}`);
    console.log(`   - Total Processed: ${mergedItemsMap.size}`);

    if (isDryRun) {
      console.log('\n⚠️  DRY-RUN ONLY: No database changes were written.');
    } else {
      const finalCount = await PortfolioProject.countDocuments();
      console.log(`   - Total in DB:    ${finalCount}`);
      console.log('\n✅ Portfolio seeding completed successfully!');
    }
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('❌ Error during portfolio seeding:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed.');
    process.exit(0);
  }
}

seedPortfolioProjects();
