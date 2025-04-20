import express from 'express'
import { helpandsupportservice, IssueMAsterService, subIssueMAsterService } from "../controllers/helpandsupportcontroller.js";
import {upload} from '../middlewares/multer.aws-s3.middleware.js'
const router = express.Router()

// router.route('/help').post(helpandsupportservice)
router.post('/help', upload.single('photo'), helpandsupportservice);
router.route('/issue').get(IssueMAsterService)
router.route('/subissue').post(subIssueMAsterService)


export default router