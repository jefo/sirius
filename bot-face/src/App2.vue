<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>
      <md-app-content>
        <div class="md-layout md-gutter md-alignment-center">
           <div>
              <Chart :trades="trades" />
              <md-tabs class="md-transparent" md-alignment="fixed">
                <md-tab id="tab-overview" md-label="Overview"></md-tab>
                <md-tab id="tab-summary" md-label="Performance Summary"></md-tab>
                <md-tab id="tab-list-of-trades" md-label="List of Trades"></md-tab>
              </md-tabs>
              <PerformanceSummary :all="performance.all" :long="performance.long" :short="performance.short" />
              <!-- <ListOfTrades :trades="trades" /> -->
           </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import PerformanceSummary from './components/PerformanceSummary.vue'
// import ListOfTrades from './components/ListOfTrades.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Chart,
    PerformanceSummary,
    // ListOfTrades
  },
  data () {
    return {
      currentTab: 'tab-overview',
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
        this.trades = resp.data.trades;
        console.log('this.performance', resp.data);
        console.log('this.trades', this.trades);
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
