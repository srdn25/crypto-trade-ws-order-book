- [x] Need to establish a WebSocket connection to a cryptocurrency exchange server
- [x] Receive streaming messages
- [x] From streaming messages, need to extract the lowest sell price and the highest buy price of a given coin
- [x] The obtained prices should then be written to a file for further analysis

---
Example message from websocket
```
{
  "data": {
    "orderbook": {
      "instrument_id": "BTCUSD",
      "buy": [
        {
          "quantity": 0.003,
          "price": 28500
        },
        {
          "quantity": 0.19701892,
          "price": 28201.91
        },
        {
          "quantity": 0.022431139999999995,
          "price": 28201.07
        },
        {
          "quantity": 0.000525,
          "price": 28200.95
        },
        {
          "quantity": 0.019629960000000002,
          "price": 28200.65
        },
        {
          "quantity": 0.39455488,
          "price": 28200.28
        },
        {
          "quantity": 0.001,
          "price": 25000
        },
        {
          "quantity": 0.001,
          "price": 10
        },
        {
          "quantity": 0.02,
          "price": 0.1
        },
        {
          "quantity": 0.002,
          "price": 0.089032
        }
      ],
      "sell": [
        {
          "quantity": 0.75980747,
          "price": 28775.33
        },
        {
          "quantity": 0.01234963,
          "price": 28775.34
        },
        {
          "quantity": 0.18,
          "price": 28775.35
        },
        {
          "quantity": 0.0742335,
          "price": 28776.48
        },
        {
          "quantity": 0.18,
          "price": 28776.49
        },
        {
          "quantity": 0.5694,
          "price": 28776.86
        },
        {
          "quantity": 0.07896838,
          "price": 28777.34
        },
        {
          "quantity": 0.0760924,
          "price": 28777.61
        },
        {
          "quantity": 0.03684872,
          "price": 28778.47
        },
        {
          "quantity": 0.27591255,
          "price": 42222
        },
        {
          "quantity": 5,
          "price": 55555
        }
      ]
    }
  }
}
```

---
Example output from BTCUSD.txt
```
[Wed May 03 2023 20:27:54 GMT-0300 (Atlantic Daylight Time)]: Buy - 28705.07, Sell = 29286.23
[Wed May 03 2023 20:27:55 GMT-0300 (Atlantic Daylight Time)]: Buy - 28705.09, Sell = 29287.55
[Wed May 03 2023 20:27:56 GMT-0300 (Atlantic Daylight Time)]: Buy - 28701.3, Sell = 29283.82
[Wed May 03 2023 20:27:57 GMT-0300 (Atlantic Daylight Time)]: Buy - 28701.41, Sell = 29284.78
[Wed May 03 2023 20:27:58 GMT-0300 (Atlantic Daylight Time)]: Buy - 28699.71, Sell = 29284.58
```