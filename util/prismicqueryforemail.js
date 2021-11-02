const fs = require("fs");
const Prismic = require('@prismicio/client');

const client = Prismic.client("http://gctravelapp.cdn.prismic.io/api")
return client.query(Prismic.Predicates.at('document.type', 'standaloneestimator-email-notifications')) // An empty query will return all the documents
  .then(function(response) {
    let json = JSON.stringify(response.results[0].data['standaloneestimator-email-notifications']['message_to_traveller'].value[0].text);
    console.log("Documents: ", json);
    fs.writeFile('./email-notifications.json', json, (err) => {
        if (err) throw err;
        console.log('JSON email-notifications saved.');
    });
  }, function(err) {
    console.log("Something went wrong: ", err);
  });