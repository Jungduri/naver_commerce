const fetch = require('node-fetch');
const { DateTime } = require('luxon');

async function get_new_order_list(token) {
    const headers = { 'Authorization': token };
    const url = 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/last-changed-statuses';

    const now = DateTime.now();
    const beforeDate = now.minus({ days: 1 }); // Two days ago
    const iosFormat = beforeDate.toISO();

    const params = new URLSearchParams({
        'lastChangedFrom': iosFormat, // Start date for the query
        'lastChangedType': 'PAYED', // Last changed type (PAYED: Payment completed, DISPATCHED: Dispatched)
    });

    const fullUrl = `${url}?${params}`;
    const response = await fetch(fullUrl, { headers });
    const res_data = await response.json();

    console.log(res_data)
    if (!('data' in res_data)) {
        console.log('No order history');
        return false;
    }

    const data_list = res_data.data.lastChangeStatuses;

    for (const data of data_list) {
        console.log(data); // Order information
    }
}

// Usage example
const token = "6xHx969n0viUzK28bYA9zZ";
get_new_order_list(token)
    .catch(error => console.error(error));