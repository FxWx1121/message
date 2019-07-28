import Vue from 'vue'
import App from './App.vue'

// 导入全局样式
import './assets/css/index.css'

// 统一设置axios
import axios from 'axios'
// 所有Vue实例可以通过$axios来使用axios
Vue.prototype.$axios = axios
// 设置基地址 基础地址
// axios.defaults.baseURL = 'http://www.winchains.net'

// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 导入路由
import router from './router.js'

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router
}).$mount('#app')
