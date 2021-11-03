const fetch = require('node-fetch');
global.Headers = fetch.Headers;

module.exports = async function (requestBody) {
    const amadeusClientId = process.env.AMADEUS_CLIENT_ID;
    const amadeusSecret = process.env.AMADEUS_SECRET;
    const amadeusBaseUrl = process.env.AMADEUS_BASE_URL;

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

    let originAirportCode = requestBody.query.originAirportCode;
    let destinationAirportCode = requestBody.query.destinationAirportCode;
    let departureDate = requestBody.query.departureDate;
    let returnDate = requestBody.query.returnDate;
    let departureTime = requestBody.query.departureTime + ":00";
    let returnTime = requestBody.query.returnTime + ":00";
    let departureOffset = requestBody.query.departureOffset + "H";
    let returnOffset = requestBody.query.returnOffset + "H";

    return await fetch(amadeusBaseUrl + "/v1/security/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(async fetchTokenResult => {
            let flightOfferHeaders = new Headers();
            flightOfferHeaders.append("Authorization", `Bearer ${fetchTokenResult.access_token}`);
            flightOfferHeaders.append("Content-Type", "application/json");

            let flightOfferRawBody = JSON.stringify({
                "currencyCode": "CAD",
                "originDestinations": [{
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
                "travelers": [{
                    "id": "1",
                    "travelerType": "ADULT"
                }],
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
                        "cabinRestrictions": [{
                            "cabin": "ECONOMY",
                            "coverage": "MOST_SEGMENTS",
                            "originDestinationIds": [
                                "1"
                            ]
                        }]
                    }
                }
            });

            let requestOptions = {
                method: 'POST',
                headers: flightOfferHeaders,
                body: flightOfferRawBody,
                redirect: 'follow'
            };

            const findMedian = arr => {
                const mid = Math.floor(arr.length / 2),
                    nums = [...arr].sort((a, b) => a - b);
                return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
            };

            return await fetch(amadeusBaseUrl + "/v2/shopping/flight-offers", requestOptions)
                .then(response => response.json())
                .then(result => {
                    let allPrices = [];

                    result.data.forEach(itinerary => {
                        allPrices.push(parseFloat(itinerary.price.grandTotal))
                    });

                    const sum = allPrices.reduce((a, b) => a + b, 0);
                    const avg = (sum / allPrices.length) || 0;

                    let minimum = Math.min(...allPrices)

                    let maximum = Math.max(...allPrices)

                    let median = findMedian(allPrices)

                    return {
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
        .catch(error => {
            return {
                body: error
            };
        })
}
