const https = require('https');
const crypto = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
//This is not Base64, but just 'hex' funtion
const Base16 = require('crypto-js/enc-hex');
const HmacSHA256 = require('crypto-js/hmac-sha256');

var apiHost = 'email.ca-central-1.amazonaws.com';
var apiName = 'email';
var awsSecretAccessKey = 'BGatNL/UVF5KFdncCbgbq6GPdTA8yoXuhN0bldnWmeCn';
var awsSecretAccessKeyId = 'AKIA4DJHEGSUNXTQ2B5O';
var awsRegion = 'ca-central-1';
var serviceName = 'email';
var algorithm = 'AWS4-HMAC-SHA256';

function signAPIRequest() {
    var dateTime = new Date();
    //Not sure why but 'replaceAll' was not working, so I had to call 'replace' multiple times.
    //This formats date like: 20201115T231123Z
    var dateTimeInUTC = dateTime.toISOString().replace(/\-/, '').replace(/\-/, '')
        .replace(/:/, '').replace(/:/, '').replace(/(\.\d+)/, '');
    //Get only Date
    var date = dateTimeInUTC.split("T")[0];
    //Using process.env variable, we can get ACCESS KEY/SECRET KEY of IM Role assigned to Lambda
    var signingKey = getSignatureKey(awsSecretAccessKey, date, awsRegion, serviceName);
    var credentialScope = date + '/SendEmail' + awsRegion + '/' + serviceName + '/aws4_request';
    //Headers name: Header value
    var canonicalHeaders = 'cache-control:max-age=0\nhost:' + apiHost + '\nx-amz-date:' + dateTimeInUTC + '\n';
    //Headers should be in lower case, headers in same order as are in above variable
    //These are just name of headers
    var signedHeaders = 'Cache-Control;host;X-Amz-Date'.toLowerCase();
    var canonicalRequest = 'GET\n' + '/' + '\n' + '\n' + canonicalHeaders + '\n' + signedHeaders + '\n' +
        Base16.stringify(SHA256(''));
    //console.log("Canonical Request: " + canonicalRequest);
    var hashedCanonicalRequest = Base16.stringify(SHA256(canonicalRequest));
    var stringToSign = algorithm + '\n' + dateTimeInUTC + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
    //console.log("String To Sign: " + stringToSign);
    var signature = Base16.stringify(HmacSHA256(stringToSign, signingKey));
    var authorization = algorithm + ' Credential=' + awsSecretAccessKeyId + '/' + date + '/' +
        awsRegion + '/' + serviceName + '/aws4_request, SignedHeaders=' + signedHeaders +
        ', Signature=' + signature;

    let request = {
        hostname: apiHost,
        path: apiName,
        method: 'GET',
        headers: {
            'Cache-Control': 'max-age=0',
            'X-Amz-Date': dateTimeInUTC,
            'Authorization': authorization,
        }
    };
    console.log('Auth Header: ' + JSON.stringify(request, null, 2));
    console.log(makeCall(request));
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
    var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = crypto.HmacSHA256(regionName, kDate);
    var kService = crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

function makeCall(options) {
    return new Promise(function (resolve, reject) {
        const request = https.request(options, (res) => {
            var finalData = '';
            res.on('data', function (data) {
                finalData += data;
            });
            res.on('end', function (data) {
                console.log(finalData)
                resolve(finalData);
            });
        });

        request.on('error', (e) => {
            console.log(e)
            reject(e);
        });

        request.write('');

        request.end();
    });
}

signAPIRequest()