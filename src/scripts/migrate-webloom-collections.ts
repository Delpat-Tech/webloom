/**
 * migrate-webloom-collections.ts
 *
 * Copies `partners` and `testimonials` collections from the OLD webloom DB
 * into the NEW/current website DB, preserving ObjectIds and preventing duplicates.
 *
 * Run BEFORE switching the MONGODB_URI env var:
 *   npm run migrate:webloom
 *
 * Required env vars:
 *   MONGODB_URI         — destination (new/current website DB)
 *   MONGODB_URI_OLD     — source (old webloom DB)
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose, { Connection } from 'mongoose';

const SRC_URI = process.env.MONGODB_URI_OLD;
const DEST_URI = process.env.MONGODB_URI;

if (!SRC_URI || !DEST_URI) {
  console.error('Missing env vars: MONGODB_URI_OLD (source) and MONGODB_URI (destination) are both required.');
  process.exit(1);
}

if (SRC_URI === DEST_URI) {
  console.error('Source and destination URIs are identical — nothing to migrate.');
  process.exit(1);
}

async function migrateCollection(
  src: Connection,
  dest: Connection,
  collectionName: string
): Promise<{ inserted: number; skipped: number }> {
  const srcCol = src.collection(collectionName);
  const destCol = dest.collection(collectionName);

  const docs = await srcCol.find({}).toArray();
  if (docs.length === 0) {
    console.log(`  [${collectionName}] Source is empty, nothing to migrate.`);
    return { inserted: 0, skipped: 0 };
  }

  let inserted = 0;
  let skipped = 0;

  for (const doc of docs) {
    const existing = await destCol.findOne({ _id: doc._id });
    if (existing) {
      skipped++;
      continue;
    }
    await destCol.insertOne(doc);
    inserted++;
  }

  return { inserted, skipped };
}

async function run() {
  console.log('Connecting to source and destination databases...');

  const src = await mongoose.createConnection(SRC_URI!).asPromise();
  const dest = await mongoose.createConnection(DEST_URI!).asPromise();

  console.log('Connected. Starting migration...\n');

  const collections = ['partners', 'testimonials'];

  for (const col of collections) {
    console.log(`Migrating: ${col}`);
    const { inserted, skipped } = await migrateCollection(src, dest, col);
    console.log(`  inserted: ${inserted}, skipped (already existed): ${skipped}\n`);
  }

  console.log('Migration complete.');

  await src.close();
  await dest.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
