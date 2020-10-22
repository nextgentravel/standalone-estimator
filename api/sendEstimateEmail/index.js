module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: req.body.to, // Change to your recipient
      from: 'gctravelapp@gmail.com', // Change to your verified sender
      subject: 'Travel Estimate',
      text: 'Here it is!',
      html: '<strong>Here it is!</strong>',
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