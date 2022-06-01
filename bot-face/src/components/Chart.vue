<template>
<trading-vue titleTxt="LTCUSDT" :data="this.$data.chart" :overlays="overlays"></trading-vue>
</template>
<script>

// import flattenDeep from 'lodash.flattendeep';
import { TradingVue, DataCube } from 'trading-vue-js'
import Overlays from 'tvjs-overlays'

const chart = new DataCube({
    chart: {
        data: [
            // [timestamp, open, high, low, close, volume]
        ]
    }, onchart: [{
        name: 'LongShortTrades',
        type: 'LongShortTrades',
        data: [],
        settings: {}
    }], offchart: []
}, { aggregation: 100 });

export default {
    name: 'TwChart',
    components: { TradingVue },
    data() {
        return {
            chart,
            overlays: [Overlays['LongShortTrades']],
            tradesOverlayData: [],
        }
    },
    props: ['trades'],
    created: function() {
        if (this.trades) {
            this.trades.forEach(t => {
                this.tradesOverlayData.push([
                    t.entry.time,
                    t.entry.type === 'long' ? 1 : 0,
                    "",
                    "",
                    0, // open,
                    0, // high
                    0, // low
                    0, // close
                ]);
            })
            // this.tradesOverlayData = this.trades.map(t => ({

            // }))
        }
        // wss://stream.binance.com:9443/
        fetch(
            "https://api.binance.com/api/v3/klines?symbol=LTCUSDT&interval=15m&limit=200"
        )
        .then((response) => response.json())
        .then((commits) => {
            chart.set('chart.data', commits.map(e => e.map(d => parseFloat(d)).slice(0, 6)));
        });
        this.$socket.onopen = () => {
            console.log('open');
            this.$socket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params": [
                    "ltcusdt@kline_15m",
                ],
                "id": 1
            }));
        }
        this.$options.sockets.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.e !== 'kline') {
                return;
            }
            chart.merge('chart.data', [
                // [timestamp, open, high, low, close, volume]
                [data.k.t, parseFloat(data.k.o), parseFloat(data.k.h), parseFloat(data.k.l), parseFloat(data.k.c)]
            ]);
        }
  }
}

</script>