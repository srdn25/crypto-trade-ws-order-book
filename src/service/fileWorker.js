const fs = require('fs');
class FileWorker {
    constructor (currencies) {
        this.currencies = currencies;
        this.streamList = new Map(this.currencies.map(cur => [cur, null]));
    }

    writePriceByCurrency (currency, data) {
        const stream = this.streamList.get(currency);

        if (!stream) {
            throw Error(`Not found stream for write data to file for ${currency}`);
        }

        stream.write(data, 'utf-8');
    }

    createFileWriteStreamList () {
        this.streamList.forEach((value, key) => {
            const stream = fs.createWriteStream(`${process.cwd()}/logs/${key}.txt`, {
                flags: 'a',
            });
            this.streamList.set(key, stream);
        });
    }

    closeFileStreamList () {
        this.streamList.forEach((value, key) => {
            const stream = this.streamList.get(key);
            stream.end();
        });
    }
}

module.exports = FileWorker;