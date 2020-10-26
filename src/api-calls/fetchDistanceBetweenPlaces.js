module.exports = async function (origin, destination) {
    return fetch(`/api/fetchDistanceBetweenPlaces?origin=${origin}&destination=${destination}`)
}