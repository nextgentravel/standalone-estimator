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
    let departureTime = req.query.departureTime + ":00";
    let returnTime = req.query.returnTime + ":00";
    let departureOffset = req.query.departureOffset + "H";
    let returnOffset = req.query.returnOffset + "H";

    await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(async fetchTokenResult => {
            let flightOfferHeaders = new Headers();
            flightOfferHeaders.append("Authorization", `Bearer ${fetchTokenResult.access_token}`);
            flightOfferHeaders.append("Content-Type", "application/json");
            
            let flightOfferRawBody = JSON.stringify({
              "currencyCode": "CAD",
              "originDestinations": [
                {
                  "id": "1",
                  "originLocationCode": originAirportCode,
                  "destinationLocationCode": destinationAirportCode,
                  "departureDateTimeRange": {
                    "date": departureDate,
                    "time": departureTime,
                    "timeWindow": departureOffset
                  }
                },
                {
                  "id": "2",
                  "originLocationCode": destinationAirportCode,
                  "destinationLocationCode": originAirportCode,
                  "departureDateTimeRange": {
                    "date": returnDate,
                    "time": returnTime,
                    "timeWindow": returnOffset
                  }
                }
              ],
              "travelers": [
                {
                  "id": "1",
                  "travelerType": "ADULT"
                }
              ],
              "sources": [
                "GDS"
              ],
              "searchCriteria": {
                "pricingOptions": {
                  "includedCheckedBagsOnly": false,
                  "refundableFare": false,
                  "noRestrictionFare": false,
                  "noPenaltyFare": false
                },
                // "maxFlightOffers": 250,
                "flightFilters": {
                  "cabinRestrictions": [
                    {
                      "cabin": "ECONOMY",
                      "coverage": "MOST_SEGMENTS",
                      "originDestinationIds": [
                        "1"
                      ]
                    }
                  ]
                }
              }
            });

            console.log(flightOfferRawBody)
            
            let requestOptions = {
              method: 'POST',
              headers: flightOfferHeaders,
              body: flightOfferRawBody,
              redirect: 'follow'
            };

            await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", requestOptions)
                .then(response => response.json())
                .then(result => {
                    let allPrices = [];

                    result.data.forEach(itinerary => {
                        itinerary.itineraries.forEach((thing) => {
                            thing.segments.forEach((segment) => {
                                if (segment.departure.iataCode === originAirportCode || segment.departure.iataCode === destinationAirportCode) {
                                    console.log(segment.departure.iataCode, segment.departure.at)
                                }
                                
                            })
                        })
                        allPrices.push(parseFloat(itinerary.price.grandTotal))
                    });
    
                    const sum = allPrices.reduce((a, b) => a + b, 0);
                    const avg = (sum / allPrices.length) || 0;

                    let minimum = Math.min( ...allPrices )

                    let maximum = Math.max( ...allPrices )

                    let median = findMedian(allPrices)

                    function findMedian(a) {
                        let n = a.length
                        a.sort();
                        if (n % 2 != 0)
                            return a[n / 2];
                     
                        return (a[Math.floor((n-1)/2)] +
                                a[n / 2]) / 2;
                    }

                    context.res = {
                        body: {
                            average: avg,
                            numberOfResults: result.data.length,
                            minimum,
                            maximum,
                            median
                        }
                    };
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => context.res = {
            body: error
        })
}