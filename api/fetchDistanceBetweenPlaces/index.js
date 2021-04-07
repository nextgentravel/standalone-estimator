const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const googleToken = process.env.GOOGLE_API_TOKEN;

    let origin = req.query.origin;
    let destination = req.query.destination;

    await fetch(encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${googleToken}`))
        .then(response => response.text())
        .then(result => {
            context.log('result', result)
            context.res = {
                body: result
            };
        })
        .catch(error => context.log('error', error));

}