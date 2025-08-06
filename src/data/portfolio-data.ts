import { PortfolioItem } from './portfolio-types';

// Import all projects from src/data/projects
import { aiResumeOptimizer } from './projects/ai-resume-optimizer';
import { apolloVenturesScriptFix } from './projects/apollo-ventures-script-fix';
import { atsResumeRanker } from './projects/ats-resume-ranker';
import { betwatchBot } from './projects/betwatch-bot';
import { bspDataScraper } from './projects/bsp-data-scraper';
import { catPrephub } from './projects/cat-prephub';
import { chartViewTradingModule } from './projects/chart-view-trading-module';
import { customAssess } from './projects/custom-assess';
import { customScrapingDashboard } from './projects/custom-scraping-dashboard';
import { dehazingAi } from './projects/dehazing-ai';
import { docxScriptRebuild } from './projects/docx-script-rebuild';
import { emailAutomation } from './projects/email-automation';
import { eventWebsite } from './projects/event-website';
import { focalPointScraper } from './projects/focal-point-scraper';
import { fondFoodDelivery } from './projects/fond-food-delivery';
import { grantAgentRevisions } from './projects/grant-agent-revisions';
import { grantReportGeneratorV1 } from './projects/grant-report-generator-v1';
import { japmalaApp } from './projects/japmala-app';
import { jobPostingAutomation } from './projects/job-posting-automation';
import { liveoakGrantGenerator } from './projects/liveoak-grant-generator';
import { marketPulseExchange } from './projects/market-pulse-exchange';
import { muscleMentorAiFix } from './projects/muscle-mentor-ai-fix';
import { muscleMentorStripe } from './projects/muscle-mentor-stripe';
import { numeratesWebsite } from './projects/numerates-website';
import { omegaForexCrm } from './projects/omega-forex-crm';
import { omegaForexTrading } from './projects/omega-forex-trading';
import { pygameNeatBot } from './projects/pygame-neat-bot';
import { recipeFinderApp } from './projects/recipe-finder-app';
import { redFlagApp } from './projects/red-flag-app';
import { schoolWebsiteErp } from './projects/school-website-erp';
import { spotifyDownloader } from './projects/spotify-downloader';
import { spotifyRecommender } from './projects/spotify-recommender';
import { telegramCrm } from './projects/telegram-crm';
import { worldClockApp } from './projects/world-clock-app';
import { youtubeAutomation } from './projects/youtube-automation';

// Create the portfolio items array
export const portfolioItems: PortfolioItem[] = [
  aiResumeOptimizer,
  apolloVenturesScriptFix,
  atsResumeRanker,
  betwatchBot,
  bspDataScraper,
  catPrephub,
  chartViewTradingModule,
  customAssess,
  customScrapingDashboard,
  dehazingAi,
  docxScriptRebuild,
  emailAutomation,
  eventWebsite,
  focalPointScraper,
  fondFoodDelivery,
  grantAgentRevisions,
  grantReportGeneratorV1,
  japmalaApp,
  jobPostingAutomation,
  liveoakGrantGenerator,
  marketPulseExchange,
  muscleMentorAiFix,
  muscleMentorStripe,
  numeratesWebsite,
  omegaForexCrm,
  omegaForexTrading,
  pygameNeatBot,
  recipeFinderApp,
  redFlagApp,
  schoolWebsiteErp,
  spotifyDownloader,
  spotifyRecommender,
  telegramCrm,
  worldClockApp,
  youtubeAutomation,
];

// Re-export the PortfolioItem type
export type { PortfolioItem };
