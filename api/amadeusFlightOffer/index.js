let amadeusFlightOffer = require('./function');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  
  let result = await amadeusFlightOffer(req);

  console.log('result', result);

  context.res = {
    body: result.body
  };
}