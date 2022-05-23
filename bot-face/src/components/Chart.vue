<template>
<trading-vue :data="this.$data"></trading-vue>
</template>
<script>

import TradingVue from 'trading-vue-js'

export default {
    name: 'TwChart',
    components: { TradingVue },
    data() {
        return {
            ohlcv: [
                [ 1551128400000, 33,  37.1, 14,  14,  196 ],
                [ 1551132000000, 13.7, 30, 6.6,  30,  206 ],
                [ 1551135600000, 29.9, 33, 21.3, 21.8, 74 ],
                [ 1551139200000, 21.7, 25.9, 18, 24,  140 ],
                [ 1551142800000, 24.1, 24.1, 24, 24.1, 29 ],
            ]
        }
    },
    created: function() {
        // wss://stream.binance.com:9443/
        console.log('this.$socket', this.$socket);
        console.log('this.$options.sockets', this.$options.sockets);
        this.$socket.onopen = () => {
            console.log('open');
            this.$socket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params": [
                    "btcusdt@kline_15m",
                ],
                "id": 1
            }))
        }
        this.$options.sockets.onmessage = function(data) {
            console.log(JSON.parse(data.data));
        }
  }
}

</script>