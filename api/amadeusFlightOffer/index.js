const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (context, req) {
    const amadeusClientId = process.env.AMADEUS_CLIENT_ID;
    const amadeusSecret = process.env.AMADEUS_SECRET;
    context.log('JavaScript HTTP trigger function processed a request.');

    let fetchTokenHeaders = new Headers();
    fetchTokenHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", amadeusClientId);
    urlencoded.append("client_secret", amadeusSecret);

    let requestOptions = {
        method: 'POST',
        headers: fetchTokenHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let fetchFlightofferHeaders = new Headers();

    let originAirportCode = req.query.originAirportCode;
    let destinationAirportCode = req.query.destinationAirportCode;
    let departureDate = req.query.departureDate;
    let returnDate = req.query.returnDate;

    await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(async fetchTokenResult => {
            fetchFlightofferHeaders.append("X-HTTP-Method-Override", "GET");
            fetchFlightofferHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            fetchFlightofferHeaders.append("Authorization", `Bearer ${fetchTokenResult.access_token}`);

            let fetchFlightOfferRequestOptions = {
                method: 'GET',
                headers: fetchFlightofferHeaders,
                redirect: 'follow'
            };

            let offerRequestUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originAirportCode}&destinationLocationCode=${destinationAirportCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&currencyCode=CAD`

            await fetch(offerRequestUrl, fetchFlightOfferRequestOptions)
                .then(response => response.json())
                .then(result => {

                    let allPrices = [];

                    result.data.forEach(itinerary => {
                        allPrices.push(parseFloat(itinerary.price.grandTotal))
                    });
    
                    const sum = allPrices.reduce((a, b) => a + b, 0);
                    const avg = (sum / allPrices.length) || 0;

                    context.res = {
                        body: {
                            flightEstimate: avg,
                            numberOfResults: result.data.length
                        }
                    };
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => context.res = {
            body: error
        })
}