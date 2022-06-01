<template>
  <md-table>
    <md-table-row>
      <md-table-head></md-table-head>
      <md-table-head>All</md-table-head>
      <md-table-head>Long</md-table-head>
      <md-table-head>Short</md-table-head>
    </md-table-row>
    <md-table-row>
      <md-table-head>Net Profit</md-table-head>
      <md-table-cell>{{all.netProfit}}</md-table-cell>
      <md-table-cell>{{long.netProfit}}</md-table-cell>
      <md-table-cell>{{short.netProfit}}</md-table-cell>
    </md-table-row>
    <md-table-row>
      <md-table-head>Profit Factor</md-table-head>
      <md-table-cell>{{all.profitFactor}}</md-table-cell>
      <md-table-cell>{{long.profitFactor}}</md-table-cell>
      <md-table-cell>{{short.profitFactor}}</md-table-cell>
    </md-table-row>
    <md-table-row>
      <md-table-head>Percent Profitable</md-table-head>
      <md-table-cell>{{all.percentProfitable}}</md-table-cell>
      <md-table-cell>{{long.percentProfitable}}</md-table-cell>
      <md-table-cell>{{short.percentProfitable}}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'PerformanceSummary',
  props: ['all', 'long', 'short'],
}
</script>
