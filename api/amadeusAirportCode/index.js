const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (context, req) {
    var myHeaders = new Headers();

    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let access_token = req.query.access_token;

    myHeaders.append("X-HTTP-Method-Override", "GET");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}&radius=50`, requestOptions)
        .then(response => response.text())
        .then(result => {
            context.log('result', result)
            context.res = {
                body: result
            };
        })
        .catch(error => console.log('error', error));

}