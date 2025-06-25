import 'dotenv/config';
import fs from 'fs';
import { Parser } from 'json2csv';
import path from 'path';
// import { uploadFileToS3 } from './upload.js';
import { zipCsvFile } from '../utils/.csvtoZipservice.js';
import {getPool2} from '../db/db.js'
import { PC_NM_Pool_Mailer } from '../models/BrandPoolQuery.js';



// async function exportAndCheckSize() {
//   try {
//     const pool = getPool2();
//     const result = await pool.request().query(PC_NM_Pool_Mailer)
//     // .query(`exec [10.10.152.16].[z_scope].dbo.Brand_Pool_Exp_MS '28'`);

//     if (!result.recordset.length) {
//       return { success: false, message: 'No data found' };
//     }
//     // console.log(result.recordset[0]);
    
//     const parser = new Parser();
//     const csv = parser.parse(result.recordset);
    
//     const date = new Date().toISOString().slice(0, 10);
//     const fileName = `TATA_GNR_${date}.csv`;
//     const filePath = path.join(process.env.LOCAL_FOLDER, fileName);
//     // const filePath = path.join('C:/Users/vishu/VishuScs/S3', fileName);
    

//     const dir = path.dirname(filePath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     fs.writeFileSync(filePath, csv);
//     console.log("File extracted Done");

//     const csvPath = filePath;
//     const outputZipPath = path.join(process.env.LOCAL_FOLDER, `TATA_GNR_${date}.zip`);

//    await zipCsvFile(csvPath, outputZipPath)
//   .then(() => console.log('📦 CSV zipped successfully!'))
//   .catch(err => console.error('❌ Failed to zip CSV:', err));
    
// console.log(outputZipPath);

//     // const stats = fs.statSync(filePath);
//     // const sizeMB = stats.size / (1024 * 1024);

//     // if (sizeMB > 250) {
//     //   fs.unlinkSync(filePath);
//     //   return { success: false, message: 'File exceeds 250MB limit. Skipped.' };
//     // }

// return {
//   success: true,
//   message: 'Exported successfully',
//   outputZipPath,
//   s3Key: `exports/${fileName}` //  optional folder structure in S3
// };

//   } catch (err) {
//     return { success: false, message: `Error: ${err.message}` };
//   }
// }

async function exportAndCheckSize({ query, filenamePrefix }) {
  try {
    const pool = getPool2();
    const result = await pool.request().query(query);

    if (!result.recordset.length) {
      return { success: false, message: 'No data found' };
    }

    const parser = new Parser();
    const csv = parser.parse(result.recordset);

    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${filenamePrefix}_${date}.csv`;
    const filePath = path.join(process.env.LOCAL_FOLDER, fileName);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, csv);
    console.log("✅ File extracted successfully");

    const outputZipPath = path.join(process.env.LOCAL_FOLDER, `${filenamePrefix}_${date}.zip`);
    await zipCsvFile(filePath, outputZipPath);

    console.log('📦 CSV zipped successfully!');
    return {
      success: true,
      message: 'Exported and zipped successfully',
      outputZipPath,
      s3Key: `exports/${fileName}`
    };

  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
}

export {exportAndCheckSize}
