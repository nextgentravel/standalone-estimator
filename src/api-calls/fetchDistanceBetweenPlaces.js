module.exports = async function (origin, destination) {
    return fetch("/api/fetchDistanceBetweenPlaces?origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
    })
}