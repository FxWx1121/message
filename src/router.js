import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件
import index from "./components/index.vue";
import recompose from "./components/recompose.vue";
import detail from "./components/detail.vue";
import loading from "./components/loading.vue";

// 规则

let routes = [
  {
    path: "/",
    component: index,
    meta: {
      keepAlive: true 
    }
  },
  {
    path: "/recompose/:id",
    name:"recompose",
    component: recompose
  },
  {
    path: "/detail/:id",
    component: detail
  },
  {
    path: "/loading",
    component: loading
  },
];

// 实例化路由对象
let router = new VueRouter({
  mode: "history",
  routes
});

// 暴露
export default router;
