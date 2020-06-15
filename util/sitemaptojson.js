const fs = require("fs");
const DomParser = require('dom-parser');
const parser = new DomParser();

const processXML = (string) => {
    let parsed = parser.parseFromString(string, "text/xml")
    let urlArray = parsed.getElementsByTagName('loc')
    let result = urlArray.map(node => {
        return node.firstChild.text.replace('https://travel-guidebook.herokuapp.com', '')
    });
    // manually add the 404 page to the array, since it's excluded by default
    result.push('/404')
    return result;
}

fs.readFile('././public/sitemap.xml', 'utf8', (err, data) => {
    if (err) throw err;
    let result = processXML(data)
    let json = JSON.stringify(result);
    fs.writeFile('././sitemap.json', json, (err) => {
        if (err) throw err;
        console.log('JSON sitemap saved.');
    });
});
