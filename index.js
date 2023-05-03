const fs = require('fs');
const WebSocket = require('ws');
const { createClient } = require('graphql-ws');
const getHighAndLowBids = require('./src/action/getHighAndLowBids');

const wsClient = createClient({
    webSocketImpl: WebSocket,
    url: 'wss://vakotrade.cryptosrvc-dev.com/graphql',
});

const monitoringCurrency = new Map([
    ['BTCUSD', null],
]);

async function execute (payload) {
    const onNext = (data) => {
        console.log('GET message');
        const orderBook = data?.data?.orderbook;
        if (orderBook) {
            getHighAndLowBids(orderBook, monitoringCurrency);
        }
    };

    let unsubscribe = () => {
        console.log('Close connection');
    };

    return new Promise((resolve, reject) => {
        unsubscribe = wsClient.subscribe(
            payload,
            {
                next: onNext,
                error: reject,
                complete: resolve,
            },
        );
    });
}

(async () => {
    try {
        monitoringCurrency.forEach((value, key) => {
            const stream = fs.createWriteStream(`./logs/${key}.txt`, {
                flags: 'a',
            });
            monitoringCurrency.set(key, stream);
        });

        console.log('Created write streams for write to files');

        await execute({
            query: 'subscription ($instrument_id: String!) {orderbook (instrument_id: $instrument_id) {instrument_id, buy { quantity, price }, sell { quantity, price }}}',
            variables: {
                instrument_id: 'BTCUSD',
            }
        });
    } catch (error) {
        console.log(error);

        monitoringCurrency.forEach((value, key) => {
            const stream = monitoringCurrency.get(key);
            stream.end;
        });
    }
})();
