<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>5 
      <md-app-content>
        <div class="md-layout md-gutter md-alignment-center">
           <div>
             <Chart />
              <md-tabs class="md-transparent" md-alignment="fixed">
                <md-tab id="tab-home" md-label="Overview"></md-tab>
                <md-tab id="tab-pages" md-label="Performance Summary"></md-tab>
                <md-tab id="tab-posts" md-label="List of Trades"></md-tab>
              </md-tabs>
              <md-table>
                <md-table-row>
                  <md-table-head md-numeric>ID</md-table-head>
                  <md-table-head>Name</md-table-head>
                  <md-table-head>Email</md-table-head>
                  <md-table-head>Gender</md-table-head>
                  <md-table-head>Job Title</md-table-head>
                </md-table-row>
                <md-table-row>
                  <md-table-cell md-numeric>1</md-table-cell>
                  <md-table-cell>Shawna Dubbin</md-table-cell>
                  <md-table-cell>sdubbin0@geocities.com</md-table-cell>
                  <md-table-cell>Male</md-table-cell>
                  <md-table-cell>Assistant Media Planner</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell md-numeric>2</md-table-cell>
                  <md-table-cell>Odette Demageard</md-table-cell>
                  <md-table-cell>odemageard1@spotify.com</md-table-cell>
                  <md-table-cell>Female</md-table-cell>
                  <md-table-cell>Account Coordinator</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell md-numeric>3</md-table-cell>
                  <md-table-cell>Vera Taleworth</md-table-cell>
                  <md-table-cell>vtaleworth2@google.ca</md-table-cell>
                  <md-table-cell>Male</md-table-cell>
                  <md-table-cell>Community Outreach Specialist</md-table-cell>
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

export default {
  name: 'App',
  components: {
    Chart
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
