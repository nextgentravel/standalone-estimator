const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (context, req) {
    var myHeaders = new Headers();

    let originAirportCode = req.query.originAirportCode;
    let destinationAirportCode = req.query.destinationAirportCode;
    let departureDate = req.query.departureDate;
    let returnDate = req.query.returnDate;
    let access_token = req.query.access_token;

    myHeaders.append("X-HTTP-Method-Override", "GET");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${access_token}`);



    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`https://fdsafdsffdsafdsftest.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originAirportCode}&destinationLocationCode=${destinationAirportCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&currencyCode=CAD`, requestOptions)
        .then(response => response.text())
        .then(result => {
            context.log('result', result)
            context.res = {
                body: result
            };
        })
        .catch(error => console.log('error', error));

}