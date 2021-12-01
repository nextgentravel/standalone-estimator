const fs = require("fs")
const PrismicDom = require("prismic-dom")
const Prismic = require("@prismicio/client")
const htmlEntities = require("html-entities")

const client = Prismic.client("http://gctravelapp.cdn.prismic.io/api")

client
  .query(
    Prismic.Predicates.at(
      "document.type",
      "standaloneestimator-email-notifications"
    ),
    { lang: "*" }
  )
  .then(
    function (response) {
      const messages = {}
      response.results.forEach(item => {
        const lang = item.lang.slice(0, 2)
        for (const [key, value] of Object.entries(
          item.data["standaloneestimator-email-notifications"]
        )) {
          if (value.type === "StructuredText") {
            let result = PrismicDom.RichText.asHtml(value.value)
            let decoded = htmlEntities.decode(result)
            messages[`${key}_${lang}`] = decoded
          } else {
            let result = value.value
            messages[`${key}_${lang}`] = result
          }
        }
      })
      let data = JSON.stringify(messages)
      fs.writeFile(
        "./api/sendEstimateEmailCeres/prismic-email-notifications.json",
        data,
        err => {
          if (err) throw err
          console.log("JSON email-notifications saved.")
        }
      )
    },
    function (err) {
      console.log("Something went wrong: ", err)
    }
  )

client
  .query(Prismic.Predicates.at("document.type", "standaloneestimator-copy"), {
    lang: "*",
  })
  .then(
    function (response) {
        const words = {travelCategories:{},travelMode:{},accommodationType:{}};
      response.results.forEach(item => {
        const lang = item.lang.slice(0, 2)
        const categories =
          item.data["standaloneestimator-copy"]
            .email_form_category_options.value
        const catList = categories.map(cat => cat.option_label.value)
        words.travelCategories[`${lang}`] = catList

        const flight = item.data["standaloneestimator-copy"].flight.value;
        const train = item.data["standaloneestimator-copy"].train.value;
        const rental = item.data["standaloneestimator-copy"].rental.value;
        const privatevehicle = item.data["standaloneestimator-copy"].private_vehicle.value;
        const notrequired = item.data["standaloneestimator-copy"].not_required.value;

        words.travelMode[`${lang}`] = {flight,train,rental,privatevehicle,notrequired}

        const hotel=item.data["standaloneestimator-copy"].hotel.value;
        const private=item.data["standaloneestimator-copy"].private.value;

        words.accommodationType[`${lang}`] = {hotel,private,notrequired}
      })
      let data = JSON.stringify(words)
      fs.writeFile(
        "./api/sendEstimateEmailCeres/prismic-email-keywords.json",
        data,
        err => {
          if (err) throw err
          console.log("JSON email-keywords saved.")
        }
      )
    },
    function (err) {
      console.log("Something went wrong: ", err)
    }
  )

return
