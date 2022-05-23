<template>
<trading-vue titleTxt="BTCUSDT" :data="this.$data.chart"></trading-vue>
</template>
<script>

// import flattenDeep from 'lodash.flattendeep';
import { TradingVue, DataCube } from 'trading-vue-js'

const chart = new DataCube({
    chart: {
        data: [
            // [timestamp, open, high, low, close, volume]
        ]
    }, onchart: [], offchart: []
}, { aggregation: 100 });

export default {
    name: 'TwChart',
    components: { TradingVue },
    data() {
        return {
            chart,
        }
    },
    created: function() {
        // wss://stream.binance.com:9443/
        fetch(
            "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=200"
        )
        .then((response) => response.json())
        .then((commits) => {
            console.log('commits', commits);
            // console.log(commits.map(e => parseFloat(e)));
            chart.set('chart.data', commits.map(e => e.map(d => parseFloat(d)).slice(0, 6)));
            // // chart.set('chart.data', [
            // //     commits.t, parseFloat(commits.k.o), parseFloat(commits.k.h), parseFloat(commits.k.l), parseFloat(commits.k.c)
            // // ]);
        });

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
        this.$options.sockets.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.e !== 'kline') {
                return;
            }
            // console.log('this.data', data);
            // console.log('data', [data.k.t, parseFloat(data.k.o), parseFloat(data.k.h), parseFloat(data.k.l), parseFloat(data.k.c)]);
            chart.merge('chart.data', [
                // [timestamp, open, high, low, close, volume]
                [data.k.t, parseFloat(data.k.o), parseFloat(data.k.h), parseFloat(data.k.l), parseFloat(data.k.c)]
            ])

            // this.data.chart.merge('chart.data', [
            //     // [data.]
            // ])
            // console.log('data', data);
        }
  }
}

</script>