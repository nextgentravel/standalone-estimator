let fetchDistanceBetweenPlaces = require('./function');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let result = await fetchDistanceBetweenPlaces(req)

    result = await result.json();
    context.res = {
        body: result
    };
}