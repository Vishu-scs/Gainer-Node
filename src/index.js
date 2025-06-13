import 'dotenv/config'
import {connectDB} from "./db/db.js"
import {app}  from "./app.js"
import cron from 'node-cron'
import {init} from './controllers/tataBrandpool.js'
const PORT = process.env.PORT || 3001
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is runnning at PORT: ${PORT}`)
    })
})
.catch((err)=>{
    console.log(" connection failed",err);
})


// setTimeout(() => init(), 3000)

// TATA PVBU Brand Pool Scheduler 
// ✅ Schedule it to run every day at 8:00 AM
    cron.schedule('0 8 * * *', () => {
      console.log(`⏰ Running scheduled job at ${new Date().toLocaleString()}`);
      init();
    });