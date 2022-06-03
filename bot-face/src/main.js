import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import VueMaterial from 'vue-material'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'wss://stream.binance.com:9443/ws');
Vue.use(VueMaterial)

new Vue({
  render: h => h(App),
}).$mount('#app')
