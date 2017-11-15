// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/router'
import store from './config/store'
import MuseUI from 'muse-ui'
import API from './config/api'
import Axios from 'axios'

Vue.prototype.$api = API;
Vue.prototype.$http = Axios;
Vue.prototype.$empty = function (obj) {// 判断传入的值是否为空
  return typeof (obj) === "undefined" || obj === "" || obj === null;
};
import 'muse-ui/dist/muse-ui.css'
import './libs/toast/src/style.css'

Vue.use(MuseUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});



