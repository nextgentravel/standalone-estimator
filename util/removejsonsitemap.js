const fs = require("fs");

fs.unlink('././sitemap.xml', (err, data) => {
    if (err) throw err;
    console.log("json sitemap removed.")
});
