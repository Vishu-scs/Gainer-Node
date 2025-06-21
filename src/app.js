import express from 'express'
import cors from 'cors'
import  helpandsupportservice  from './routes/helpandsupportroute.js'
import { scheduleTataBrandPoolJob } from './jobs/tatapcbrandpool_job.js'

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

scheduleTataBrandPoolJob()

app.use("/api/v1/gnr",helpandsupportservice)

app.get('/', (req, res) => {
    res.send('🚀 API is running...');
  });
  


export {app}