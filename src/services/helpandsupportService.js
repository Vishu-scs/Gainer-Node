import 'dotenv/config'
import { transporter } from '../utils/helpandsupportservice.js'
import {getPool} from '../db/db.js'

const helpsupportApi = async(req,res)=>{
    try {
      const pool = await getPool()
      const {issue, desc , userid , locationid , service} = req.body
      if(!issue || !desc || !userid || !locationid ||!service){
        return res.status(400).json({message:`All fields are Required`})
      }
      try {
        const query = `INSERT into HelpSupportGainer(Issue,Description,UserID,LocationID,Service)
                      values ('${issue}','${desc}' , ${userid} , ${locationid},${service})`
        await pool.request().query(query)
      } catch (error) {
         return res.status(500).json({Error:error.message})
      }

      const query = `select CONCAT(vcFirstName , ' ',vcLastName) as Name , vcEmail from z_scope..adminmaster_gen where bintId_Pk = ${userid} `
    const result =  await pool.request().query(query)
    const username = result.recordset[0].Name;
    const useremail = result.recordset[0].vcEmail

    const query2 = `select brand , dealer , location from z_scope..locationinfo where locationid = ${locationid}`
    const locationResult  = await pool.request().query(query2) 
     const Brand = locationResult.recordset[0].brand;
     const Dealer = locationResult.recordset[0].dealer;
     const Location = locationResult.recordset[0].location;

     const query3 = `select Top 1 hsg.TicketID ,hsg.Addedon ,sm.Service   from z_scope..HelpSupportGainer hsg
                    join z_scope..ServiceMaster sm on sm.ServiceID = hsg.service 
                    where userid = ${userid} and locationid = ${locationid} order by addedon desc`
      const TicketResult = await pool.request().query(query3)  
      const TicketID = TicketResult.recordset[0].TicketID
      const Service = TicketResult.recordset[0].Service
      let Datetime = TicketResult.recordset[0].Addedon

      const { formattedDate, formattedDateTime } = formatUTCDateTime(Datetime);      

      const mailOptions = {
          from: process.env.EMAILID,
          to: 'vishu.bansal@sparecare.in,scope@sparecare.in,gainer.alerts@sparecare.in',useremail,
          subject: `[Ticket #${TicketID}]: ${Service}_${issue}_${formattedDate}`,
html: `
    <p>Hi <strong>${username}</strong>,</p>

    <p>Thank you for contacting us. This is an automated response confirming the receipt of your ticket. One of our agents will get back to you as soon as possible.</p>

    <p><strong>Ticket Details:</strong></p>
    <ul>
      <li><strong>Ticket ID:</strong> #${TicketID}</li>
      <li><strong>Ticket Date:</strong> ${formattedDateTime}</li>
      <li><strong>Service:</strong> ${Service}</li>
      <li><strong>Brand:</strong> ${Brand}</li>
      <li><strong>Dealer:</strong> ${Dealer}</li>
      <li><strong>Location:</strong> ${Location}</li>
      <li><strong>Issue:</strong> ${issue}</li>
      <li><strong>Description:</strong> ${desc}</li>
      <li><strong>Status:</strong> Being Processed</li>
      <li><strong>Priority:</strong> High</li>
    </ul>

    <p>Regards,<br/>Team SpareCare</p>`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ Error: 'Failed to send Mail.' });
          }          
          res.status(200).json({ message: 'Mail sent successfully.'});
        });
    } catch (error) {
      console.log(error.message);
      
      res.status(500).json({Error:error.message})
    }
    
}
// function formatUTCDateTime(isoString) {
//   const date = new Date(isoString);

//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const month = monthNames[date.getUTCMonth()];
//   const year = date.getUTCFullYear();

//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(date.getUTCSeconds()).padStart(2, '0');

//   const formattedDate = `${day}-${month}-${year}`;
//   const formattedDateTime = `${formattedDate} ${hours}:${minutes}:${seconds}`;

//   return { formattedDate, formattedDateTime };
// }
function formatUTCDateTime(isoString) {
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
  const formattedHours = String(hours).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  const formattedDateTime = `${formattedDate} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

  return { formattedDate, formattedDateTime };
}




export {helpsupportApi}


