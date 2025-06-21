// cronJobs/tataBrandPoolCron.js
import cron from 'node-cron'
import { init } from '../controllers/tataBrandpool.js'

export const scheduleTataBrandPoolJob = () => {
  // console.log("📅 Scheduling TATA Brand Pool cron job at 8:00 AM");

  cron.schedule('17 15 * * *', async () => {
    console.log(`Job triggered at ${new Date().toLocaleString()}`);
    try {
      await init();
      console.log(`Job completed at ${new Date().toLocaleString()}`);
    } catch (err) {
      console.error("❌ [CRON] init() failed:", err);
    }
  });
};
