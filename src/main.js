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

import { trackViewBehavior } from "./api/index";

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
  return val1 ? "$" + val1.toFixed(2) : "";
});
Vue.filter("priceGroup", (val) => {
  //价格整数与小数分割
  return `$${val.toString().split(".")[0] - 0}</span><a>${
    val.toString().split(".").length > 1 ? val.toString().split(".")[1] : ""
  }</a>`;
});

Vue.prototype.$toast = Toast;

// 谷歌数据采集方法
function decorateUrl(urlString) {
  var ga = window[window["GoogleAnalyticsObject"]];
  var tracker;
  if (ga && typeof ga.getAll === "function") {
    tracker = ga.getAll()[0]; // Uses the first tracker created on the page
    urlString = new window.gaplugins.Linker(tracker).decorate(urlString);
  }
  return urlString;
}

// 获取query参数

function getQueryVariable(query, variable) {
  let vars = query.split("?");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

// 首次进入页面
// if (sessionStorage.getItem("access") !== true) {
console.log("=>", "首次进入页面");
if (!sessionStorage.getItem("viewTime")) {
  sessionStorage.setItem("viewTime", Date.now());
}
// 首次进入页面
const origin = getQueryVariable(window.location.href, "origin");
if (origin) {
  sessionStorage.setItem("channel", origin);
  trackViewBehavior({ type: 1, origin: origin });
}
// sessionStorage.setItem("access", true);
// }
function doEnter() {
  console.log("=>", "进入页面");
  if (!sessionStorage.getItem("viewTime")) {
    sessionStorage.setItem("viewTime", Date.now());
  }
}
async function doLeave() {
  console.log("=>", "离开页面");
  if (sessionStorage.getItem("viewTime") && sessionStorage.getItem("channel")) {
    const totalTime = Date.now() - +sessionStorage.getItem("viewTime");
    console.log("=>", "浏览时长", `浏览了${totalTime / 1000}秒`);
    await trackViewBehavior({
      type: 7,
      viewTime: totalTime,
      origin: sessionStorage.getItem("channel"),
    });
    //清除
    sessionStorage.removeItem("viewTime");
  }
}
// 各种浏览器兼容
var hidden, state, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
  state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
  state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
  state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
  state = "webkitVisibilityState";
}
// 添加监听器，在title里显示状态变化
document.addEventListener(
  visibilityChange,
  function() {
    // document.title = document[state];
    if (document[state] === "hidden") {
      doLeave();
    } else {
      doEnter();
    }
  },
  false
);

const cb = ({ url, type, id, shopId }) => {
  //渠道
  trackViewBehavior({
    type,
    id,
    origin: sessionStorage.getItem("channel"),
  });
  let openUrl = "";

  if (shopId) {
    // console.log("=>", "yesyes...", shopId);
    ///如果url中自带参数则拼接到后面
    const isParamsExist = ~url.indexOf("?");
    const channel = sessionStorage.getItem("channel");

    if (isParamsExist) {
      openUrl = url + (channel ? "&origin=" + channel : "");
    } else {
      openUrl = url + (channel ? "?origin=" + channel : "");
    }
    // console.log("=>", "yesyes...", openUrl);
  } else {
    openUrl = decorateUrl(url);
  }
  window.open(openUrl, "_blank");
};

Vue.directive("jumpTo", function(el, binding) {
  const { url, type, id, shopId } = binding.value;

  el.onclick = function() {
    cb({ url, type, id, shopId });
  };
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
