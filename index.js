const fs = require('fs');
const WebSocket = require('ws');
const getHighAndLowBids = require('./src/action/getHighAndLowBids');

const wsClient = new WebSocket('wss://vakotrade.cryptosrvc-dev.com/graphql');

const monitoringCurrency = new Map([
    ['BTCUSD', null],
]);

wsClient.on('error', (error) => {
    monitoringCurrency.forEach((value, key) => {
        const stream = monitoringCurrency.get(key);
        stream.end;
    });

    console.log(error);
});

wsClient.on('open', function open() {
    console.log('Connected to webSocket');

    monitoringCurrency.forEach((value, key) => {
        const stream = fs.createWriteStream(`./logs/${key}`);
        monitoringCurrency.set(key, stream);
    });

    console.log('Created write streams for write to files');
});

wsClient.on('message', function message(data) {
    const orderBook = data.payload?.data?.orderbook;
    if (orderBook) {
        getHighAndLowBids(orderBook, monitoringCurrency);
    }
});