module.exports = async function (originAirportCode, destinationAirportCode, departureDateISODate, returnDateISODate, departureTime, returnTime, departureOffset, returnOffset) {
    return fetch("/api/amadeusFlightOffer?originAirportCode=" + originAirportCode + "&destinationAirportCode=" + destinationAirportCode + "&departureDate=" + departureDateISODate + "&returnDate=" + returnDateISODate + "&departureTime=" + departureTime + "&returnTime=" + returnTime + "&departureOffset=" + departureOffset + "&returnOffset=" + returnOffset, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}