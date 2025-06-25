// cronJobs/tataBrandPoolCron.js
import cron from 'node-cron'
import { Honda_4W_BrandPool_AutoMailer } from '../controllers/brandPools.js'

export const scheduleHonda4WBrandPool = () => {
  // console.log("📅 Scheduling TATA Brand Pool cron job at 8:00 AM");

  cron.schedule('30 11 * * *', async () => {
    console.log(`Honda 4W Job triggered at ${new Date().toLocaleString()}`);
    try {
      await Honda_4W_BrandPool_AutoMailer();
      console.log(`Honda 4W Job completed at ${new Date().toLocaleString()}`);
    } catch (err) {
      console.error("❌ [CRON] init() failed:", err);
    }
  });
};
