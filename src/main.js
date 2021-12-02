// Vue
import Vue from "vue";
// APP组件
import App from "./App.vue";
// 路由
import router from "@/router";
// vuex
import store from "@/store";
// tip
Vue.config.productionTip = false;
// 重置默认样式
import "normalize.css";
// rem插件
import "amfe-flexible";
// vant注册组件
import "./plugins/vant.js";
// 全局window函数
import "@/utils/tools.js";
// 谷歌翻译配置
import "@/utils/translate_a.js";
// 分析模块
import "@/utils/analysis.js";
// 过滤器
import "@/filters";
// 自定义指令
import "@/directives";
// copy插件
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
