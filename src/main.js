import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "@/router";
Vue.config.productionTip = false;
//重置默认样式
import "normalize.css";
import "minireset.css";
//
import "amfe-flexible";
// 引入组件
import {
  Swipe,
  SwipeItem,
  Tabs,
  Tab,
  Grid,
  GridItem,
  Collapse,
  CollapseItem,
  Image as VanImage,
  Skeleton,
  Loading,
  // Overlay,
  Icon,
  Toast,
} from "vant";
Toast.setDefaultOptions({ className: "notranslate" });
import "vant/lib/swipe/style";
import "vant/lib/swipe-item/style";
import "vant/lib/tabs/style";
import "vant/lib/grid/style";
import "vant/lib/grid-item/style";
import "vant/lib/collapse-item/style";
import "vant/lib/collapse/style";
import "vant/lib/loading/style";
import "vant/lib/skeleton/style";
// import "vant/lib/overlay/style";
import "vant/lib/icon/style";
import "vant/lib/toast/style";

Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabs);
Vue.use(Tab);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Loading);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Skeleton);
// Vue.use(Overlay);
Vue.use(Icon);
Vue.use(Toast);
// 国际化
import "@/utils/translate_a.js";
//copy功能
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
//过滤器
Vue.filter("countFix", (val1, val2) => {
  //差价求和
  return val1 ? "$" + ((val2 * 100 + val1 * 100) / 100).toFixed(2) : "";
});
Vue.filter("priceGroup", (val) => {
  //价格整数与小数分割
  return `$${val.toString().split(".")[0] - 0}</span><a>${
    val.toString().split(".").length > 1 ? val.toString().split(".")[1] : ""
  }</a>`;
});

Vue.prototype.$toast = Toast;
// 跳转
Vue.directive("jumpTo", function(el, binding) {
  let targrtUrl = binding.value;
  el.onclick = function() {
    window.open(targrtUrl, "_blank");
  };
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
