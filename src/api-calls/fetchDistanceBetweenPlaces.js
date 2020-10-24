module.exports = async function (origin, destination) {
    return fetch(`/api/fetchDistanceBetweenPlaces?units=metric&origins=${origin}&destinations=${destination}`)
}6