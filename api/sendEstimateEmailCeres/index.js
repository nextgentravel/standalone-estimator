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
        return "Rental Car"
        break;
      case 'private':
        return "Private Vehicle"
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
      default:
        return input;
    }
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
              `(Le français suit l'anglais.)<br /><br />
              
              ${body.travellersName},<br /><br />

              The following trip estimate has been submitted to ${body.approversName} for planning purposes:<br /><br />
              
              Objective: ${body.tripName}<br /><br />
              
              Category: ${travelCategory(body.travelCategory, 'en')}<br />
              Public servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              Origin: ${addCommaToPlaceName(body.origin.acrdName)}<br />
              Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${accommodationType(body.accommodationType, 'en')}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')}<br /><br />
              
              Transportation (${travelMode(body.transportationType, 'en')}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')}<br /><br />
              
              Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}<br /><br />
              
              Meals and incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')}<br /><br />
              
              Other costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')}<br /><br />
              
              Notes: ${body.tripNotes}<br /><br />
              
              Thank you for using the GC Travel Calculator!<br /><br />

              All dates expressed in this email are in YYYY-MM-DD format.<br /><br />

              ---

              <br /><br />
              ${body.travellersName},<br /><br />

              L'estimation de voyage suivante a été présentée à ${body.approversName} des fins de planification :<br /><br />
              
              Objectif: ${body.tripName}<br /><br />
              
              Catégorie: ${travelCategory(body.travelCategory, 'fr')}<br />
              Fonctionnaire: ${body.travellerIsPublicServant ? 'Oui' : 'Non'}<br /><br />
                
              Point d’origine: ${addCommaToPlaceName(body.origin.acrdName)}<br />
              Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
              Départ: ${body.departureDate}<br />
              Retour: ${body.returnDate}<br /><br />
              
              Hébergement (${accommodationType(body.accommodationType, 'fr')}): ${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}<br /><br />
              
              Transport (${travelMode(body.transportationType, 'fr')}): ${localCurrencyDisplay(body.transportationCost, 'fr-CA')}<br /><br />
              
              Transport local: ${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}<br /><br />
              
              Repas et frais accessoires: ${localCurrencyDisplay(body.mealCost, 'fr-CA')}<br /><br />
              
              Autres coûts: ${localCurrencyDisplay(body.otherCost, 'fr-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'fr-CA')}<br /><br />
              
              Remarques: ${body.tripNotes}<br /><br />
              
              Merci d’utiliser le Calculateur de voyage du GC!<br /><br />
              
              Toutes les dates indiquées dans ce courriel utilisent le format AAAA-MM-JJ.
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Estimate sent [Confirmation] / L'estimation a été envoyée [Confirmation]`
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
              `(Le français suit l'anglais.)<br /><br />

              ${body.approversName},<br /><br />

              ${body.travellersName} has submitted a new travel estimate for a trip to ${addCommaToPlaceName(body.destination.acrdName)}.<br /><br />

              Objective: ${body.tripName}<br /><br />
              
              Category: ${travelCategory(body.travelCategory, 'en')}<br />
              Public servant: ${body.travellerIsPublicServant ? 'Yes' : 'No'}<br /><br />
                
              Origin: ${addCommaToPlaceName(body.origin.acrdName)}<br />
              Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${accommodationType(body.accommodationType, 'en')}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')}<br /><br />
              
              Transportation (${travelMode(body.transportationType, 'en')}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')}<br /><br />
              
              Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')}<br /><br />
              
              Meals and incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')}<br /><br />
              
              Other costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')}<br /><br />
              
              Notes: ${body.tripNotes}<br /><br />
              
              If you have questions regarding this estimate, please email ${body.travellersName} at ${body.travellersEmail}<br /><br />

              All dates expressed in this email are in YYYY-MM-DD format.<br /><br />

              ---

              <br /><br />
              ${body.approversName},<br /><br />

              ${body.travellersName} a présenté une nouvelle estimation de voyage pour un voyage à ${addCommaToPlaceName(body.destination.acrdName)}.<br /><br />

              Objectif: ${body.tripName}<br /><br />
              
              Catégorie: ${travelCategory(body.travelCategory, 'fr')}<br />
              Fonctionnaire: ${body.travellerIsPublicServant ? 'Oui' : 'Non'}<br /><br />
                
              Origine: ${addCommaToPlaceName(body.origin.acrdName)}<br />
              Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
              Départ: ${body.departureDate}<br />
              Retour: ${body.returnDate}<br /><br />
              
              Hébergement (${accommodationType(body.accommodationType, 'fr')}): ${localCurrencyDisplay(body.accommodationCost, 'fr-CA')}<br /><br />
              
              Transport (${travelMode(body.transportationType, 'fr')}): ${localCurrencyDisplay(body.transportationCost, 'fr-CA')}<br /><br />
              
              Transport local: ${localCurrencyDisplay(body.localTransportationCost, 'fr-CA')}<br /><br />
              
              Repas et frais accessoires: ${localCurrencyDisplay(body.mealCost, 'fr-CA')}<br /><br />
              
              Autres dépenses: ${localCurrencyDisplay(body.otherCost, 'fr-CA')}<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'fr-CA')}<br /><br />
              
              Remarques: ${body.tripNotes}<br /><br />
              
              Si vous avez des questions, veuillez communiquer avec ${body.travellersName}, à ${body.travellersEmail}.<br /><br />
              
              Toutes les dates indiquées dans ce courriel utilisent le format AAAA-MM-JJ.<br /><br />
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Trip estimate / Estimation de voyage`,
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
    }

    let csvHeaders = Object.keys(csvLineObject);
    let csvData = csvHeaders.map(key => `"${csvLineObject[key]}"`).join(',')

    let debugParams = {
      Source: 'GC Travel Calculator / Calculateur de voyage du GC <tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca>',
      Destination: {
        ToAddresses: [
          'Joseph.Moubayed@tpsgc-pwgsc.gc.ca',
          'mike@codefor.ca',
        ]
      },
      ReplyToAddresses: ['tpsgc.nepasrepondre-donotreply02.pwgsc@tpsgc-pwgsc.gc.ca'],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: 
              `
              Origin: ${addCommaToPlaceName(body.origin.acrdName)}<br />
              Destination: ${addCommaToPlaceName(body.destination.acrdName)}<br /><br />
              
              Departure: ${body.departureDate}<br />
              Return: ${body.returnDate}<br /><br />
              
              Accommodation (${accommodationType(body.accommodationType, 'en')}): ${localCurrencyDisplay(body.accommodationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.accommodationCost, 'en-CA')})<br /><br />
              
              Transportation (${travelMode(body.transportationType, 'en')}): ${localCurrencyDisplay(body.transportationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.transportationCost, 'en-CA')})<br /><br />
              
              Local transportation: ${localCurrencyDisplay(body.localTransportationCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.localTransportationCost, 'en-CA')})<br /><br />
              
              Meals and incidentals: ${localCurrencyDisplay(body.mealCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.mealCostTotal, 'en-CA')})<br /><br />
              
              Other costs: ${localCurrencyDisplay(body.otherCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.otherCost, 'en-CA')})<br /><br />
              
              TOTAL: ${localCurrencyDisplay(body.summaryCost, 'en-CA')} (Initital: ${localCurrencyDisplay(initialResult.summaryCost, 'en-CA')})<br /><br />

              All dates expressed in this email are in YYYY-MM-DD format.<br /><br />

              <br><br>CSV: (Header followed by data)<br><br>
              ${csvHeaders}

              <br>

              ${csvData}

              <br><br>

              Initial Result: <br><br>
              ${JSON.stringify(initialResult, null, '<br>')}
              `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Report: Trip estimate`,
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

    await new AWS.SES(SESConfig)
      .sendEmail(debugParams)
      .promise()
      .then((res) => {
        console.log('res: ', res)
      })
      .catch((err) => {
        console.log('err: ', err)
      });

      context.res = {
        body: JSON.stringify(response)
      };

}
