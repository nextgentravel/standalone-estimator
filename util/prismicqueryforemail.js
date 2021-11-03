const fs = require("fs")
const PrismicDom = require("prismic-dom")
const Prismic = require("@prismicio/client")
const htmlEntities = require("html-entities")

const client = Prismic.client("http://gctravelapp.cdn.prismic.io/api")

return client
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
