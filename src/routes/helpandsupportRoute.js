import express from 'express'
import { helpandsupportservice } from "../controllers/helpandsupportcontroller.js";
const router = express.Router()


router.route('/help').post(helpandsupportservice)


export default router