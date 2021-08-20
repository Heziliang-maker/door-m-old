/*
 * @Date: 2021-08-20
 * @Description:
 */
import Vue from "vue";
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
  Button,
  Sticky,
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
Vue.use(Button);
Vue.use(Toast);
Vue.use(Sticky);
Vue.prototype.$toast = Toast;
