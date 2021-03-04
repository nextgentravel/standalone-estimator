const AWS = require('aws-sdk');


module.exports = async function (context, req) {
    let body = req.body
    // Amazon SES configuration
    const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.AWS_SES_REGION
    };
    
    console.log(SESConfig)

    // ${body.departureDate}
    // ${body.returnDate}
    // ${body.origin}
    // ${body.destination}
    // ${body.accommodationType}
    // ${body.accommodationCost}
    // ${body.accommodationMessage}
    // ${body.transportationType}
    // ${body.transportationCost}
    // ${body.transportationMessage}
    // ${body.localTransportationCost}
    // ${body.localTransportationMessage}
    // ${body.mealCost: mealCost.total}
    // ${body.otherCost}
    // ${body.tripName}
    // ${body.travellersName}
    // ${body.travellersEmail}
    // ${body.approversName}
    // ${body.approversEmail}
    // ${body.tripNotes}
    // ${body.summaryCost}
    // ${body.travelCategory}
    // ${body.travellerIsPublicServant}

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
                
              Origin: ${body.origin}<br />
              Destination: ${body.destination}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${body.accommodationType}): ${body.accommodationCost}<br /><br />
              
              Transportation (${body.transportationType}): ${body.transportationCost}<br /><br />
              
              Local transportation: ${body.localTransportationCost}<br /><br />
              
              Meals and Incidentals: ${body.mealCost}<br /><br />
              
              Other Costs: ${body.otherCost}<br /><br />
              
              TOTAL: ${body.summaryCost}<br /><br />
              
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

              ${body.travellersName} has submitted a new travel estimate for a trip to ${body.destination}.<br /><br />

              ${body.tripName}<br /><br />
              
              Objective: ${body.travelCategory}<br />
              Public Servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              Origin: ${body.origin}<br />
              Destination: ${body.destination}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${body.accommodationType}): ${body.accommodationCost}<br /><br />
              
              Transportation (${body.transportationType}): ${body.transportationCost}<br /><br />
              
              Local transportation: ${body.localTransportationCost}<br /><br />
              
              Meals and Incidentals: ${body.mealCost}<br /><br />
              
              Other Costs: ${body.otherCost}<br /><br />
              
              TOTAL: ${body.summaryCost}<br /><br />
              
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