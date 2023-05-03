const WebSocket = require('ws');
const { createClient } = require('graphql-ws');
const getHighAndLowBids = require('./src/action/getHighAndLowBids');
const FileWorker = require('./src/service/fileWorker');

const wsClient = createClient({
    webSocketImpl: WebSocket,
    url: 'wss://vakotrade.cryptosrvc-dev.com/graphql',
});

const fileWorker = new FileWorker([ 'BTCUSD' ]);

async function execute (payload) {
    const onNext = (data) => {
        console.log('GET message');
        const orderBook = data?.data?.orderbook;
        if (orderBook) {
            getHighAndLowBids(orderBook, fileWorker);
        }
    };

    let unsubscribe = () => {
        console.log('Close connection');
        fileWorker.closeFileStreamList();
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
        fileWorker.createFileWriteStreamList();
        console.log('Created write streams for write to files');

        await execute({
            query: 'subscription ($instrument_id: String!) {orderbook (instrument_id: $instrument_id) {instrument_id, buy { quantity, price }, sell { quantity, price }}}',
            variables: {
                instrument_id: 'BTCUSD',
            }
        });
    } catch (error) {
        console.log(error);
        fileWorker.closeFileStreamList();
    }
})();
