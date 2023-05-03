const { findBestPrice } = require('../utils');

module.exports = ({ buy, sell, instrument_id }, streamList) => {
    if (!buy || !sell || !instrument_id) {
        throw Error('OrderBook payload hasn\'t "instrument_id", "buy" or "sell" data');
    }

    const stream = streamList.get(instrument_id);

    if (!stream) {
        throw Error(`Not found stream for write data to file for ${instrument_id}`);
    }

    const bestSell = findBestPrice(sell, 'sell');
    const bestBuy = findBestPrice(buy, 'buy');

    stream.write(`[${new Date()}]: Buy - ${bestBuy}, Sell = ${bestSell}\n`, 'utf-8');
}