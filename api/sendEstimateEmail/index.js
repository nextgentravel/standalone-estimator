module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    let string = JSON.stringify(req.body, null, 2);

    const msg = {
      to: req.body.travellersEmail,
      from: 'gctravelapp@gmail.com',
      templateId: 'd-24d85019add04cf7aae35bbd3448f1b6',
      dynamicTemplateData: req.body,
    }

    await sgMail
        .send(msg)
        .then(() => {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: JSON.stringify({ message: 'email sent' })
            };
        })
        .catch((error) => {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: JSON.stringify({ error: error })
            };
        })
}