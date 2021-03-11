const AWS = require('aws-sdk');


const addCommaToPlaceName = (placeName) => {
  let province = placeName.slice(-2)
  let cityName = placeName.slice(0, -3)
  return `${cityName}, ${province}`
}

const localCurrencyDisplay = (string, locale) => {
  return string.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'CAD',
      currencyDisplay: 'symbol'
  }).replace('CA', '')
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
              `${body.travellersName},<br /><br />

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
              
              Thank you for using GC Travel Estimator!`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Estimate Sent [Confirmation]`
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
              `${body.approversName},<br /><br />

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
              
              If you have questions regarding this estimate, please email ${body.travellersName} at ${body.travellersEmail}<br /><br />`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Trip Estimate`,
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