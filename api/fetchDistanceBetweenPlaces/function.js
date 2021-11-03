const fetch = require('node-fetch');
global.Headers = fetch.Headers;

const googleToken = process.env.GOOGLE_API_TOKEN;

module.exports = async function (requestBody) {
    let origin = requestBody.query.origin;
    let destination = requestBody.query.destination;

    return await fetch(encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${googleToken}`));
}