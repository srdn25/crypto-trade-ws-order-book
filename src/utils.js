const findBestPrice = (arr, type) => {
    let result = arr[0].price;

    for (const { price } of arr) {

        if (type === 'sell') {
            if (price < result) {
                result = price;
            }
        } else if (type === 'buy') {
            if (price < result) {
                result = price;
            }
        } else {
            throw Error('Unknown type for find best price');
        }

    }

    return result;
};

module.exports = {
    findBestPrice,
}