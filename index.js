const http = require("https");

const options = {
    "method": "GET",
    "hostname": "api.commerce.naver.com",
    "port": null,
    "path": "/external/v1/pay-order/seller/orders/2021123115350911/product-order-ids",
    "headers": {
        "Authorization": "Bearer JDJhJDA0JFk5VzlISXRqdUcucS9zTzVKaWhjMHVIREouOVJ4MWhZTUVmdHgyNnQuRTkwdWxoTVd0eGh5"
    }
};

const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();