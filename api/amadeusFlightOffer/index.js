let amadeusFlightOffer = require('./function');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  
  let result = await amadeusFlightOffer(req);

  context.res = {
    body: result.body
  };
}