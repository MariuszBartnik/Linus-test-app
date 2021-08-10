const { Router } = require('express');
const {PrismaClient} = require('@prisma/client');
const CrmModule = require('../external_modules/CrmModule');
const EmailModule = require('../external_modules/EmailModule');

const router = Router();

router.post('/investment', async (req, res) => {
    const { email, investment_amount, project_id } = req.body;
    try{
        // Save data to DataBase
        const prisma = new PrismaClient();

        const dbResult = await prisma.investment.create({
            data: {
                email,
                investment_amount,
                project_id
            }
        });
    
        // Sending data to CRM module
        const crm = new CrmModule(process.env.CRM_SERVICE_APIKEY);
        const connection = crm.connection;
        
        const crmResults = await connection.investors.create({email, investment_amount, project_id});

        // Sending confirmation email
        const mail = new EmailModule(process.env.MAIL_SERVICE_APIKEY);
        const transport = mail.transport;
    
        const emailResult = await transport.sendMail(email, 'New investment confirmation email', `This email was sent to confirm investing ${investment_amount} in project with id ${project_id}`);

        // Sending response to FrontEnd
        if(dbResult && emailResult.success && crmResults.success){
            res.json({ success: true, dbData: dbResult, emailData: emailResult, crmData: crmResults });
        }else{
            res.json({success: false, error: {message: 'Investment could not be added. Please try again'}})
        }
    }catch(error){
        res.json({success: false, error: {message: 'Investment could not be added. Please try again'}})
    }
})

module.exports = router;