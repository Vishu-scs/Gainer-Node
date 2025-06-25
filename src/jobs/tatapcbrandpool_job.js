// cronJobs/tataBrandPoolCron.js
import cron from 'node-cron'
import { TATA_PCBU_BrandPool_AutoMailer } from '../controllers/brandPools.js'

export const scheduleTataBrandPoolJob = () => {
  // console.log("📅 Scheduling TATA Brand Pool cron job at 8:00 AM");

  cron.schedule('27 11 * * *', async () => {
    console.log(`TATA PC Brand Pool Job triggered at ${new Date().toLocaleString()}`);
    try {
      await TATA_PCBU_BrandPool_AutoMailer();
      console.log(`TATA PC Brand Pool Job completed at ${new Date().toLocaleString()}`);
    } catch (err) {
      console.error("❌ [CRON] init() failed:", err);
    }
  });
};
