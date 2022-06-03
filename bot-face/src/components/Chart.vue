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
        name: 'TradesPlus',
        type: 'TradesPlus',
        data: [
            // [1650123900000, 1, 111.8, "L"],
            // [1650261600000, 1, 106.2, "X"],

            [
				1654004700000,
				1,
				67,
				"L"
			],
			[
				1654073108492,
				0,
				67.9,
				"Stop"
			],
        ],
        settings: {}
    }], offchart: []
}, { aggregation: 100 });

export default {
    name: 'TwChart',
    components: { TradingVue },
    data() {
        return {
            chart,
            overlays: [Overlays['TradesPlus']],
            tradesOverlayData: [],
        }
    },
    props: ['trades'],
    created: function() {
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
            let data = JSON.parse(msg.data);
            if (data.e !== 'kline') {
                return;
            }
            chart.merge('chart.data', [
                // [timestamp, open, high, low, close, volume]
                [data.k.t, parseFloat(data.k.o), parseFloat(data.k.h), parseFloat(data.k.l), parseFloat(data.k.c)]
            ]);

            data = chart.get('chart.data');
            if (this.trades) {
                console.log('this.trades', this.trades);
                let trades = [];
                this.trades.slice(0, 5).forEach((t) => {
                    trades.push(                    [
                            t.entry.time,
                            t.entry.type === 'long' ? 1 : 0,
                            t.entry.value,
                            "L",
                        ],
                        [
                            t.exit.time,
                            t.exit.type === 'long' ? 0 : 1,
                            t.exit.value,
                            "X",
                        ]);
                });
                // console.log('[trades]', [trades]);
                chart.set('onchart.data', [
                    [
                        1654004700000,
                        1,
                        67,
                        "L"
                    ],
                    [
                        1654073108492,
                        0,
                        67.9,
                        "Stop"
                    ],
                ])
            }
        }
  }
}

</script>