module.exports = async function (lat, long, access_token) {
    return fetch("/api/amadeusAirportCode?latitude=" + lat + "&longitude=" + long + "&access_token=" + access_token, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
    })
}