import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

registerMicroApps([
  {
    name: '子应用child1',
    entry: 'http://localhost:9001',
    // fetch,
    container: '#subApp',
    activeRule: '/child1'
    // props: { state }
  },
  {
    name: '子应用child2',
    entry: 'http://localhost:9002',
    // fetch,
    container: '#subApp',
    activeRule: '/child2'
    // props: { state }
  }
]);

start();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#mainApp');
