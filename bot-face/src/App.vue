<template>
<!-- Real time data example -->
<span>
    <trading-vue :data="chart" :width="this.width" :height="this.height"
        :chart-config="{MIN_ZOOM:1}"
        ref="tvjs"
        :index-based="index_based"
        :overlays="overlays"
    >
    </trading-vue>
</span>
</template>

<script>
import {TradingVue, DataCube} from 'trading-vue-js'
import Overlays from 'tvjs-overlays'

import Utils from './stuff/utils.js'
import Const from './stuff/constants.js'
// import DataCube from './helpers/datacube.js'
import Stream from './helpers/stream.js'
import axios from 'axios'
// import ScriptOverlay from './Scripts/EMAx6.vue'
// import BSB from './Scripts/BuySellBalance.vue'
// Gettin' data through webpeck proxy
// const PORT = location.port
const URL = `https://api.binance.com/api/v3/klines?symbol=`
const WSS = `wss://stream.binance.com:9443/ws/ltcusdt@aggTrade`
export default {
    name: 'DataHelper',
    icon: '⚡',
    description: 'Real-time updates. Play with DataCube in the console',
    props: ['night'],
    components: {
        TradingVue
    },
    created() {
        axios.get('http://localhost:3000/ltc').then((resp) => {
            this.performance = resp.data.performance;
            this.trades = resp.data.trades;
            let trades = [];
            this.trades.sort((a, b) => a[0] - b[0]);
            this.trades.forEach((t) => {
                trades.push([
                    t.entry.time,
                    t.entry.type === 'long' ? 1 : 0,
                    t.entry.value,
                    t.entry.type === 'long' ? "L" : "S",
                ]);
                trades.push([
                    t.exit.time,
                    t.entry.type === 'long' ? 0 : 1,
                    t.exit.value,
                    "X",
                ]);
            });
            trades.sort((a, b) => a[0] - b[0]);
            console.log(trades);
            // this.chart.set('onchart.TradesPlus.data', trades)

 
        });
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
        this.onResize()
        // Load the last data chunk & init DataCube:
        let now = Utils.now()
        this.load_chunk([now - Const.HOUR4, now]).then(data => {
            this.chart = new DataCube({
                ohlcv: data['chart.data'],
                onchart: [
                    {
                        name: 'TradesPlus',
                        type: 'TradesPlus',
                        data: [
                            // [1650123900000, 1, 111.8, "L"],
                            // [1650261600000, 1, 106.2, "X"],
                            // [
                            //     1654155000000,
                            //     1,
                            //     63.4,
                            //     "L"
                            // ],
                            // [
                            //     1654182900154,
                            //     0,
                            //     63.5,
                            //     "Stop"
                            // ],
                        ],
                        settings: {}
                    }
                ],
                datasets: [{
                    type: 'Trades',
                    id: 'binance-btcusdt',
                    data: []
                }]
            }, { aggregation: 100 })
            console.log('this.chart', this.chart);

                                    this.chart.set('onchart.TradesPlus.data', 
                [
                    1654155000000,
                    1,
                    63.4,
                    "L"
                ],
                [
                    1654182900154,
                    0,
                    63.5,
                    "Stop"
                ]
            );
            // Register onrange callback & And a stream of trades
            this.chart.onrange(this.load_chunk)
            this.$refs.tvjs.resetChart()
            this.stream = new Stream(WSS)
            this.stream.ontrades = this.on_trades
            window.dc = this.chart      // Debug
            window.tv = this.$refs.tvjs // Debug
        })
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight - 50
        },
        // New data handler. Should return Promise, or
        // use callback: load_chunk(range, tf, callback)
        async load_chunk(range) {
            let [t1, t2] = range
            let x = 'LTCUSDT'
            let q = `${x}&interval=15m&startTime=${t1}&endTime=${t2}`
            let r = await fetch(URL + q).then(r => r.json())
            return this.format(this.parse_binance(r))
        },
        // Parse a specific exchange format
        parse_binance(data) {
            if (!Array.isArray(data)) return []
            return data.map(x => {
                for (var i = 0; i < x.length; i++) {
                    x[i] = parseFloat(x[i])
                }
                return x.slice(0,6)
            })
        },
        format(data) {
            // Each query sets data to a corresponding overlay
            return {
                'chart.data': data,
                // 'onchatt'
                // other onchart/offchart overlays can be added here,
                // but we are using Script Engine to calculate some:
                // see EMAx6 & BuySellBalance
            }
        },
        on_trades(trade) {
            this.chart.update({
                t: trade.T,     // Exchange time (optional)
                price: parseFloat(trade.p),   // Trade price
                volume: parseFloat(trade.q),  // Trade amount
                'datasets.binance-btcusdt': [ // Update dataset
                    trade.T,
                    trade.m ? 0 : 1,          // Sell or Buy
                    parseFloat(trade.q),
                    parseFloat(trade.p)
                ],
                // ... other onchart/offchart updates
            })
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
        if (this.stream) this.stream.off()
    },
    computed: {
        colors() {
            return this.$props.night ? {} : {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333'
            }
        },
    },
    data() {
        return {
            chart: {},
            overlays: [Overlays['TradesPlus']],
            width: window.innerWidth,
            height: window.innerHeight,
            index_based: true,
            // overlays: [ScriptOverlay, BSB]
        }
    }
}
</script>
