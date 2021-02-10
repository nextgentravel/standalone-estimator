module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    let string = JSON.stringify(req.body, null, 2);

    const travellersMsg = {
      to: req.body.travellersEmail,
      from: 'gctravelapp@gmail.com',
      templateId: 'd-24d85019add04cf7aae35bbd3448f1b6',
      dynamicTemplateData: req.body,
    }

    const approverMsg = {
        to: req.body.approversEmail,
        from: 'gctravelapp@gmail.com',
        templateId: 'd-85ec513d80a54249bf15ef46e4f3f703',
        dynamicTemplateData: req.body,
    }

    let response = {
        approver: '',
        traveller: '',
    }

    await sgMail
        .send(travellersMsg)
        .then(() => {
            response.traveller = "Email sent to traveller"
        })
        .catch((error) => {
            response.traveller = error;
        })

    await sgMail
        .send(approverMsg)
        .then(() => {
            response.approver = "Email sent to approver"
        })
        .catch((error) => {
            response.approver = error;
        })

    context.res = {
        body: JSON.stringify(response)
    };
}