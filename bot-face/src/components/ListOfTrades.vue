<template>
  <md-table>
    <md-table-row>
      <md-table-head>Trade #</md-table-head>
      <md-table-head>Type</md-table-head>
      <md-table-head>Signal</md-table-head>
      <md-table-head>Date/Time (UTC)</md-table-head>
      <md-table-head>Price</md-table-head>
      <md-table-head>Contracts</md-table-head>
      <md-table-head>Profit</md-table-head>
      <md-table-head>Cum. Profi</md-table-head>
      <md-table-head>Run-up</md-table-head>
      <md-table-head>Drawdown</md-table-head>
    </md-table-row>
    <md-table-row v-for="(trade, idx) in trades" :key="trade.entry.time">
      <md-table-cell>{{idx}}</md-table-cell>
      <md-table-cell>
        <md-table-row>
            <md-table-cell>Exit {{trade.exit.type}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>Entry {{trade.entry.type}}</md-table-cell>
        </md-table-row>
      </md-table-cell>

      <md-table-cell>
        <md-table-row>
            <md-table-cell>{{trade.exit.name}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{trade.entry.name}}</md-table-cell>
        </md-table-row>
      </md-table-cell>

      <md-table-cell>
        <md-table-row>
            <md-table-cell>{{trade.exit.time}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{trade.entry.time}}</md-table-cell>
        </md-table-row>
      </md-table-cell>

      <md-table-cell>
        <md-table-row>
            <md-table-cell>{{trade.exit.price}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{trade.entry.price}}</md-table-cell>
        </md-table-row>
      </md-table-cell>

      <md-table-cell>
        {{trade.quantity}}
      </md-table-cell>

      <md-table-cell>
        <p>{{trade.profit.p}}</p>
        <p>{{trade.profit.v}}</p>
      </md-table-cell>

      <md-table-cell>
        <p>{{trade.cumulative.p}}</p>
        <p>{{trade.cumulative.v}}</p>
      </md-table-cell>

      <md-table-cell>
        <p>{{trade.runup.p}}</p>
        <p>{{trade.runup.v}}</p>
      </md-table-cell>

      <md-table-cell>
        <p>{{trade.drawdown.p}}</p>
        <p>{{trade.drawdown.v}}</p>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'ListOfTrades',
  props: ['trades'],
}
</script>
