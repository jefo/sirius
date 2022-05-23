import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'wss://stream.binance.com:9443/ws');

new Vue({
  render: h => h(App),
}).$mount('#app')
