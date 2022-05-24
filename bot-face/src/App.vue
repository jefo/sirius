<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>
      <md-app-content>
        <div class="md-layout md-gutter md-alignment-center">
           <div>
              <Chart />
              <md-tabs class="md-transparent" md-alignment="fixed">
                <md-tab id="tab-overview" md-label="Overview"></md-tab>
                <md-tab id="tab-summary" md-label="Performance Summary"></md-tab>
                <md-tab id="tab-list-of-trades" md-label="List of Trades"></md-tab>
              </md-tabs>
              <md-table>
                <md-table-row>
                  <md-table-head></md-table-head>
                  <md-table-head>All</md-table-head>
                  <md-table-head>Long</md-table-head>
                  <md-table-head>Short</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-head>Net Profit</md-table-head>
                  <md-table-cell>{{performance.all.netProfit}}</md-table-cell>
                  <md-table-cell>{{performance.long.netProfit}}</md-table-cell>
                  <md-table-cell>{{performance.short.netProfit}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-head>Profit Factor</md-table-head>
                  <md-table-cell>{{performance.all.profitFactor}}</md-table-cell>
                  <md-table-cell>{{performance.long.profitFactor}}</md-table-cell>
                  <md-table-cell>{{performance.short.profitFactor}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-head>Percent Profitable</md-table-head>
                  <md-table-cell>{{performance.all.percentProfitable}}</md-table-cell>
                  <md-table-cell>{{performance.long.percentProfitable}}</md-table-cell>
                  <md-table-cell>{{performance.short.percentProfitable}}</md-table-cell>
                </md-table-row>
            </md-table>
           </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Chart
  },
  data () {
    return {
      performance: {
        all: {
          netProfit: 0,
          profitFactor: 0,
          percentProfitable: 0,
        },
        long: {
          netProfit: 0,
          profitFactor: 0,
          percentProfitable: 0,
        },
        short: {
          netProfit: 0,
          profitFactor: 0,
          percentProfitable: 0,
        },
      }
    }
  },
  created() {
    axios.get('http://localhost:3000/ltc').then((resp) => {
        this.performance = resp.data.performance;
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
