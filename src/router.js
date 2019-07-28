import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件
import index from "./components/index.vue";
import recompose from "./components/recompose.vue";
import old from "./components/old.vue";
import detail from "./components/detail.vue";

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
    component: recompose
  },
  {
    path: "/old",
    component: old
  },
  {
    path: "/detail/:id",
    component: detail
  },
];

// 实例化路由对象
let router = new VueRouter({
  mode: "history",
  routes
});

// 暴露
export default router;
