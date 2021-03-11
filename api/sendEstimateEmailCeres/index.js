const AWS = require('aws-sdk');
var Intl = require('intl');
// Note: you only need to require the locale once
require('intl/locale-data/jsonp/en-CA.js');
require('intl/locale-data/jsonp/fr-CA.js');

var frenchNumberFormat = Intl.NumberFormat('fr-CA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'symbol'
});

var englishNumberFormat = Intl.NumberFormat('en-CA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'symbol'
});

const addCommaToPlaceName = (placeName) => {
  let province = placeName.slice(-2)
  let cityName = placeName.slice(0, -3)
  return `${cityName}, ${province}`
}

const localCurrencyDisplay = (string, locale) => {
  if (locale === 'en-CA') {
    return englishNumberFormat.format(string).replace('CA', '').replace(/\D00(?=\D*$)/, '')
  } else if (locale === 'fr-CA') {
    return frenchNumberFormat.format(string).replace('CA', '').replace(/\D00(?=\D*$)/, '')
  }
}

module.exports = async function (context, req) {
    let body = req.body

    const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.AWS_SES_REGION
    };
    
    let confirmationParams = {
      Source: 'GC Travel Calculator <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
      Destination: {
        ToAddresses: [
          body.travellersEmail
        ]
      },
      ReplyToAddresses: ['tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca'],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: 
              `Le français suit l'anglais.<br /><br />
              
              ${body.travellersName},<br /><br />

              The following trip estimate has been submitted to ${body.approversName} for planning purposes:<br /><br />
              
              ${body.tripName}<br /><br />
              
              Objective: ${body.travelCategory}<br />
              Public Servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              Origin: ${addCommaToPlaceName(body.origin)}<br />
              Destination: ${addCommaToPlaceName(body.destination)}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${body.accommodationType}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')}<br /><br />
              
              Transportation (${body.transportationType}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')}<br /><br />
              
              Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}<br /><br />
              
              Meals and Incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')}<br /><br />
              
              Other Costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')}<br /><br />
              
              Notes: ${body.tripNotes}<br /><br />
              
              Thank you for using GC Travel Calculator!<br /><br />

              All dates expressed in this email are in YYYY-MM-DD format.<br /><br />

              ---

              <br /><br />
              ${body.travellersName},<br /><br />

              FR The following trip estimate has been submitted to ${body.approversName} for planning purposes:<br /><br />
              
              ${body.tripName}<br /><br />
              
              FR Objective: ${body.travelCategory}<br />
              FR Public Servant: ${body.travellerIsPublicServant ? 'FR Yes' : 'FR No'}<br /><br />
                
              FR Origin: ${addCommaToPlaceName(body.origin)}<br />
              FR Destination: ${addCommaToPlaceName(body.destination)}<br /><br />
              
              FR Departure: ${body.departureDate}<br />
              FR Return: ${body.returnDate}<br /><br />
              
              FR Accommodation (${body.accommodationType}): ${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}<br /><br />
              
              FR Transportation (${body.transportationType}): ${localCurrencyDisplay(body.transportationCost, 'fr-CA')}<br /><br />
              
              FR Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}<br /><br />
              
              FR Meals and Incidentals: ${localCurrencyDisplay(body.mealCost, 'fr-CA')}<br /><br />
              
              FR Other Costs: ${localCurrencyDisplay(body.otherCost, 'fr-CA')}<br /><br />
              
              FR TOTAL: ${localCurrencyDisplay(body.summaryCost, 'fr-CA')}<br /><br />
              
              FR Notes: ${body.tripNotes}<br /><br />
              
              FR Thank you for using GC Travel Calculator!<br /><br />
              <br /><br />
              FR All dates expressed in this email are in YYYY-MM-DD format.
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Estimate Sent [Confirmation] / FR Estimate Sent [Confirmation]`
        }
      }
    };

    let supervisorParams = {
      Source: 'GC Travel Calculator <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
      Destination: {
        ToAddresses: [
          body.approversEmail
        ]
      },
      ReplyToAddresses: ['tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca'],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: 
              `Le français suit l'anglais.<br /><br />

              ${body.approversName},<br /><br />

              ${body.travellersName} has submitted a new travel estimate for a trip to ${addCommaToPlaceName(body.destination)}.<br /><br />

              ${body.tripName}<br /><br />
              
              Objective: ${body.travelCategory}<br />
              Public Servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              Origin: ${addCommaToPlaceName(body.origin)}<br />
              Destination: ${addCommaToPlaceName(body.destination)}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${body.accommodationType}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')}<br /><br />
              
              Transportation (${body.transportationType}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')}<br /><br />
              
              Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}<br /><br />
              
              Meals and Incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')}<br /><br />
              
              Other Costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')}<br /><br />
              
              Notes: ${body.tripNotes}<br /><br />
              
              If you have questions regarding this estimate, please email ${body.travellersName} at ${body.travellersEmail}<br /><br />

              ---

              <br /><br />
              ${body.approversName},<br /><br />

              ${body.travellersName} has submitted a new travel estimate for a trip to ${addCommaToPlaceName(body.destination)}.<br /><br />

              ${body.tripName}<br /><br />
              
              FR Objective: ${body.travelCategory}<br />
              FR Public Servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              FR Origin: ${addCommaToPlaceName(body.origin)}<br />
              FR Destination: ${addCommaToPlaceName(body.destination)}<br /><br />
              
              FR Departure: ${body.departureDate}<br />
              FR Return: ${body.returnDate}<br /><br />
              
              FR Accommodation (${body.accommodationType}): ${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}<br /><br />
              
              FR Transportation (${body.transportationType}): ${localCurrencyDisplay(body.transportationCost, 'fr-CA')}<br /><br />
              
              FR Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}<br /><br />
              
              FR Meals and Incidentals: ${localCurrencyDisplay(body.mealCost, 'fr-CA')}<br /><br />
              
              FR Other Costs: ${localCurrencyDisplay(body.otherCost, 'fr-CA')}<br /><br />
              
              FR TOTAL: ${localCurrencyDisplay(body.summaryCost, 'fr-CA')}<br /><br />
              
              FR Notes: ${body.tripNotes}<br /><br />
              
              FR If you have questions regarding this estimate, please email ${body.travellersName} at ${body.travellersEmail}<br /><br />
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Trip Estimate / FR Trip Estimate`,
        }
      }
    };

    let response = {
      approver: '',
      traveller: '',
    }

    await new AWS.SES(SESConfig)
      .sendEmail(confirmationParams)
      .promise()
      .then((res) => {
          response.traveller = "Email sent to traveller"
      })
      .catch((err) => {
          console.log('err: ', err)
          response.traveller = err;
      });

    await new AWS.SES(SESConfig)
      .sendEmail(supervisorParams)
      .promise()
      .then((res) => {
        console.log('res: ', res)
        response.approver = "Email sent to approver"
      })
      .catch((err) => {
        console.log('err: ', err)
        response.approver = err;
      });

      context.res = {
        body: JSON.stringify(response)
      };

}