const { findBestPrice } = require('../utils');

module.exports = ({ buy, sell, instrument_id }, fileWorker) => {
    if (!buy || !sell || !instrument_id) {
        throw Error('OrderBook payload hasn\'t "instrument_id", "buy" or "sell" data');
    }

    const bestSell = findBestPrice(sell, 'sell');
    const bestBuy = findBestPrice(buy, 'buy');

    fileWorker.writePriceByCurrency(instrument_id, `[${new Date()}]: Buy - ${bestBuy}, Sell = ${bestSell}\n`);
}