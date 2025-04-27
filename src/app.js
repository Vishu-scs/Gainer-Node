import express from 'express'
import cors from 'cors'
import  helpandsupportservice  from './routes/helpandsupportroute.js'

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/gainer",helpandsupportservice)
app.get('/', (req, res) => {
    res.send('🚀 API is running...');
  });
  


export {app}