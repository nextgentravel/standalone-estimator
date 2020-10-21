const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (context, req) {
    const amadeusClientId = process.env.AMADEUS_CLIENT_ID;
    const amadeusSecret = process.env.AMADEUS_SECRET;
    context.log('JavaScript HTTP trigger function processed a request.');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", amadeusClientId);
    urlencoded.append("client_secret", amadeusSecret);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
        .then(response => response.text())
        .then(result => {
            context.log('result', result)
            context.res = {
                body: result
            };
        })
        .catch(error => context.res = {
            body: error
        })
}