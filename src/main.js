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
} from "vant";

import "vant/lib/swipe/style";
import "vant/lib/swipe-item/style";
import "vant/lib/tabs/style";
import "vant/lib/grid/style";
import "vant/lib/grid-item/style";
import "vant/lib/collapse-item/style";
import "vant/lib/collapse/style";
import "vant/lib/loading/style";
import "vant/lib/skeleton/style";

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
