import {exportAndCheckSize} from '../services/tatacvbrandpool.js'
import {uploadFileToS3} from '../services/uploadtoS3.js'
import { connectDB } from '../db/db.js';
import sql from 'mssql';
import 'dotenv/config';
import { tatacvBrandPoolMail , transporter} from '../utils/mailservice.js';

async function init() {
  try {

  await connectDB();
  const result = await exportAndCheckSize();

    if (!result.success) {
      console.error(`Export failed: ${result.message}`);
      return;
    }

    const s3Url = await uploadFileToS3(result.outputZipPath, process.env.S3_BUCKET2_NAME, result.s3Key);
    console.log(`Download URL (valid 7 Days): ${s3Url}`);

    const date = new Date().toISOString().slice(0, 10);
    const mailOptions = tatacvBrandPoolMail(date,s3Url);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Mail failed:", error.message);
        return;
      }
      console.log(`📧 Mail sent: ${info.response}`);
    });
    
    return "OK"

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  } finally {
    await sql.close(); 
  }
}

export {init}


