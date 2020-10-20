module.exports = async function (originAirportCode, destinationAirportCode, departureDate, returnDate, access_token) {
    return fetch(`/api/amadeusFlightOffer?originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&departureDate=${departureDate}&returnDate=${returnDate}&access_token=${access_token}`)
}