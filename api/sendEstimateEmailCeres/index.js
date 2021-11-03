const AWS = require('aws-sdk');
var Intl = require('intl');
const prismicData = require('./prismic-email-notifications.json')
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
  console.log(placeName)
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

const travelCategory = (input, lang) => {
  if (lang === 'en') {
    return input;
  } else if (lang === 'fr') {
    switch (input) {
      case 'Operational activities':
        return "Activités opérationnelles"
        break;
      case 'Key stakeholders':
        return "Principaux intervenants"
        break;
      case 'Internal governance':
        return "Gouvernance interne"
        break;
      case 'Training':
        return "Formation"
        break;
      case 'Other travel':
        return "Autres voyages"
        break;
      default:
        return input;
    }
  }
}

const travelMode = (input, lang) => {
  if (lang === 'en') {
    console.log(input)
    switch (input) {
      case 'flight':
        return "Flight"
        break;
      case 'train':
        return "Train"
        break;
      case 'rental':
        return "Rental car"
        break;
      case 'private':
        return "Private vehicle"
        break;
      case 'notrequired':
        return "Not required"
        break;
      default:
        return input;
    }
  } else if (lang === 'fr') {
    switch (input) {
      case 'flight':
        return "Vol"
        break;
      case 'train':
        return "Train"
        break;
      case 'rental':
        return "Location de véhicule"
        break;
      case 'private':
        return "Véhicule personnel"
        break;
      case 'notrequired':
        return "Non requis"
        break;
      default:
        return input;
    }
  }
}

const accommodationType = (input, lang) => {
  if (lang === 'en') {
    switch (input) {
      case 'hotel':
        return "Hotel"
        break;
      case 'private':
        return "Private accommodation"
        break;
      case 'notrequired':
        return "Not required"
        break;
      default:
        return input;
    }
  } else if (lang === 'fr') {
    switch (input) {
      case 'hotel':
        return "Hôtel"
        break;
      case 'private':
        return "Hébergement privé"
        break;
      case 'notrequired':
        return "Non requis"
        break;
      default:
        return input;
    }
  }
}



module.exports = async function (context, req) {
    let body = req.body

    const injectTemplateLiterals = (data) => {
      data = data.replace('${body.travellersName}', `${body.travellersName}`)
      data = data.replace('${body.approversName}', `${body.approversName}`)
      data = data.replace('${body.tripName}', `${body.tripName}`)
      data = data.replace("${travelCategory(body.travelCategory, 'fr')}", `${travelCategory(body.travelCategory, 'fr')}`)
      data = data.replace("${travelCategory(body.travelCategory, 'en')}", `${travelCategory(body.travelCategory, 'en')}`)
      data = data.replace("${body.travellerIsPublicServant ? 'Oui' : 'Non'}", `${body.travellerIsPublicServant ? 'Oui' : 'Non'}`)
      data = data.replace("${body.travellerIsPublicServant ? 'Yes' : 'No'}", `${body.travellerIsPublicServant ? 'Yes' : 'No'}`)
      data = data.replace("${addCommaToPlaceName(body.origin.acrdName)}", `${addCommaToPlaceName(body.origin.acrdName)}`)
      data = data.replace("${addCommaToPlaceName(body.destination.acrdName)}", `${addCommaToPlaceName(body.destination.acrdName)}`)
      data = data.replace("${body.departureDate}", `${body.departureDate}`)
      data = data.replace("${body.returnDate}", `${body.returnDate}`)
      data = data.replace("${accommodationType(body.accommodationType, 'fr')}", `${accommodationType(body.accommodationType, 'fr')}`)
      data = data.replace("${accommodationType(body.accommodationType, 'en')}", `${accommodationType(body.accommodationType, 'en')}`)
      data = data.replace("${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}", `${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.accommodationCost, 'en-CA')}", `${localCurrencyDisplay(body.accommodationCost, 'en-CA')}`)
      data = data.replace("${travelMode(body.transportationType, 'fr')}", `${travelMode(body.transportationType, 'fr')}`)
      data = data.replace("${travelMode(body.transportationType, 'en')}", `${travelMode(body.transportationType, 'en')}`)
      data = data.replace("${localCurrencyDisplay(body.transportationCost, 'fr-CA')}", `${localCurrencyDisplay(body.transportationCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.transportationCost, 'en-CA')}", `${localCurrencyDisplay(body.transportationCost, 'en-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}", `${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}", `${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.mealCost, 'fr-CA')}", `${localCurrencyDisplay(body.mealCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.mealCost, 'en-CA')}", `${localCurrencyDisplay(body.mealCost, 'en-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.otherCost, 'fr-CA')}", `${localCurrencyDisplay(body.otherCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.otherCost, 'en-CA')}", `${localCurrencyDisplay(body.otherCost, 'en-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.summaryCost, 'fr-CA')}", `${localCurrencyDisplay(body.summaryCost, 'fr-CA')}`)
      data = data.replace("${localCurrencyDisplay(body.summaryCost, 'en-CA')}", `${localCurrencyDisplay(body.summaryCost, 'en-CA')}`)
      data = data.replace("${body.tripNotes}", `${body.tripNotes}`)

      return data
    }

    const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.AWS_SES_REGION
    };
    
    let confirmationParams = {
      Source: 'GC Travel Calculator / Calculateur de voyage du GC <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
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
              `${injectTemplateLiterals(prismicData.message_to_traveller_en)}

              ---

              <br /><br />
              ${injectTemplateLiterals(prismicData.message_to_traveller_fr)}
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${prismicData.traveller_message_subject_en} / ${prismicData.traveller_message_subject_fr}`
        }
      }
    };

    let supervisorParams = {
      Source: 'GC Travel Calculator / Calculateur de voyage du GC <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
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
              `${injectTemplateLiterals(prismicData.message_to_approver_en)}

              ---

              <br /><br />
              ${injectTemplateLiterals(prismicData.message_to_approver_fr)}
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${prismicData.approver_message_subject_en} / ${prismicData.approver_message_subject_fr}`,
        }
      }
    };

    let initialResult = req.body.initialResult;

    let applicableRates = body.applicableRates.map((rate => {
      return `${rate.month}: ${rate.rate}`
    }))

    let csvLineObject = {
      origin: body.origin.acrdName,
      destination: body.destination.acrdName,
      departureDate: body.departureDate,
      returnDate: body.returnDate,
      applicableACRDRates: applicableRates.join(' '),
      privateVehicleRateCents: body.privateVehicleRate,
      accommodationCostEstimated: initialResult.accommodationCost,
      accommodationCostSubmitted: body.accommodationCost,
      accommodationTypeEstimated: initialResult.accommodationType,
      accommodationTypeSubmitted: body.accommodationType,
      transportationCostEstimated: initialResult.transportationCost,
      transportationCostSubmitted: body.transportationCost,
      transportationTypeEstimated: initialResult.transportationType,
      transportationTypeSubmitted: body.transportationType,
      returnDistanceEstimatedMeters: initialResult.returnDistance,
      returnDistanceSubmittedKilometres: body.privateKilometricsValue,
      localTransportationCostEstimated: initialResult.localTransportationCost,
      localTransportationCostSubmitted: body.localTransportationCost,
      mealCostEstimated: initialResult.mealCostTotal,
      mealCostSubmitted: body.mealCost,
      otherCostEstimated: initialResult.otherCost,
      otherCostSubmitted: body.otherCost,
      summaryCostEstimated: initialResult.summaryCost,
      summaryCostSubmitted: body.summaryCost,
      mealCost: body.mealCost,
      breakfast: initialResult.mealCost.breakfast,
      lunch: initialResult.mealCost.lunch,
      dinner: initialResult.mealCost.dinner,
      incidentals: initialResult.mealCost.incidentals,
      objective: body.tripName,
      category: travelCategory(body.travelCategory, 'en'),
      publicServant: body.travellerIsPublicServant ? 'Yes' : 'No',
      notes: body.tripNotes,
      flightEstimateMinimum: body.flightResult.minimum,
      flightEstimateMedian: body.flightResult.median,
      flightEstimateMaximum: body.flightResult.maximum,
    }

    let csvHeaders = Object.keys(csvLineObject);
    let csvData = csvHeaders.map(key => `"${csvLineObject[key]}"`).join(',')

    // let debugParams = {
    //   Source: 'GC Travel Calculator / Calculateur de voyage du GC <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
    //   Destination: {
    //     ToAddresses: [
    //       'TPSGC.VoyageProchaineGen-NextGenTravel.PWGSC@tpsgc-pwgsc.gc.ca',
    //     ]
    //   },
    //   ReplyToAddresses: ['tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca'],
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: "UTF-8",
    //         Data: 
    //           `

    //           Objective: ${body.tripName}<br /><br />

    //           Category: ${travelCategory(body.travelCategory, 'en')}<br />

    //           Public servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />

    //           Origin: ${addCommaToPlaceName(body.origin.acrdName)}<br />
    //           Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
    //           Departure: ${body.departureDate}<br />
    //           Return: ${body.returnDate}<br /><br />
              
    //           Accommodation (${accommodationType(body.accommodationType, 'en')}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.accommodationCost, 'en-CA')})<br /><br />
              
    //           Transportation (${travelMode(body.transportationType, 'en')}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.transportationCost, 'en-CA')})<br /><br />
              
    //           Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.localTransportationCost, 'en-CA')})<br /><br />
              
    //           Meals and incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.mealCostTotal, 'en-CA')})<br /><br />
              
    //           Other costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.otherCost, 'en-CA')})<br /><br />
              
    //           TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.summaryCost, 'en-CA')})<br /><br />

    //           Notes: ${body.tripNotes}<br /><br />

    //           <br><br>
    //           Flight Result: (returns NaN if no estimate requested)
    //           <br><br>

    //           Min: ${localCurrencyDisplay(body.flightResult.minimum, 'en-CA')}<br>
    //           Med: ${localCurrencyDisplay(body.flightResult.median, 'en-CA')}<br>
    //           Max: ${localCurrencyDisplay(body.flightResult.maximum, 'en-CA')}<br>

    //           <br><br>

    //           All dates expressed in this email are in YYYY-MM-DD format.<br /><br />

    //           <br><br>CSV: (Header followed by data)<br><br>
    //           ${csvHeaders}

    //           <br>

    //           ${csvData}

    //           <br><br>

    //           Initial Result: <br><br>
    //           ${JSON.stringify(initialResult, null, '<br>')}
    //           `
    //       }
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: `Report: Trip estimate`,
    //     }
    //   }
    // };

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

    // await new AWS.SES(SESConfig)
    //   .sendEmail(debugParams)
    //   .promise()
    //   .then((res) => {
    //     console.log('res: ', res)
    //   })
    //   .catch((err) => {
    //     console.log('err: ', err)
    //   });

      context.res = {
        body: JSON.stringify(response)
      };

}
