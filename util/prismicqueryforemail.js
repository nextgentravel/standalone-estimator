const Prismic = require('@prismicio/client');

const client = Prismic.client("http://gctravelapp.cdn.prismic.io/api")
return client.query("") // An empty query will return all the documents
  .then(function(response) {
    console.log("Documents: ", response.results);
  }, function(err) {
    console.log("Something went wrong: ", err);
  });