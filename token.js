const bcrypt = require("bcrypt");

const clientId = "15k2ilzQiGfpSMeJMRSLrJ";
const clientSecret = "$2a$04$Y9W9HItjuG.q/sO5Jihc0u";
const timestamp = Date.now();;
const password = `${clientId}_${timestamp}`;
const hashed = bcrypt.hashSync(password, clientSecret);
client_secret_sign = Buffer.from(hashed, "utf-8").toString("base64")

const fetch = require('node-fetch');

async function get_token(client_id, client_secret_sign) {

    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const data = new URLSearchParams({
        client_id,
        timestamp,
        client_secret_sign,
        grant_type: "client_credentials",
        type: "SELF"
    });

    console.log(data)
    const url = `https://api.commerce.naver.com/external/v1/oauth2/token?${data}`;
    const response = await fetch(url, { method: 'POST', headers });
    const res_data = await response.json();

    return res_data.access_token;
}

// Usage example
const client_id = "15k2ilzQiGfpSMeJMRSLrJ";
const client_secret = client_secret_sign;
get_token(client_id, client_secret, "SOME_TYPE")
    .then(token => console.log(token))
    .catch(error => console.error(error));

// const http = require("https");

// const options = {
//     "method": "POST",
//     "hostname": "api.commerce.naver.com",
//     "port": null,
//     "path": "/external/v1/oauth2/token",
//     "message": {
//         "client_id": clientId,
//     }
// };

// const req = http.request(options, function (res) {
//     const chunks = [];

//     res.on("data", function (chunk) {
//         chunks.push(chunk);
//     });

//     res.on("end", function () {
//         const body = Buffer.concat(chunks);
//         console.log(body.toString());
//     });
// });

// req.write(JSON.stringify({
//     client_id: clientId,
//     timestamp: timestamp,
//     client_secret_sign: client_secret_sign,
//     grant_type: "client_credentials",
//     type: "SELF"
// }));
// req.end();