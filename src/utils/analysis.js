/*
 * @Date: 2021-12-01
 * @Description: 渠道分析
 */
import { trackViewBehavior } from "@/api/index";
// console.log("=>", "首次进入页面");
if (!sessionStorage.getItem("viewTime")) {
  sessionStorage.setItem("viewTime", Date.now());
}
// 首次进入页面
const origin = window.getAttribute("origin");
if (origin) {
  trackViewBehavior({ type: 1, origin: origin });
}
// sessionStorage.setItem("access", true);

function doEnter() {
  // console.log("=>", "进入页面");
  if (!sessionStorage.getItem("viewTime")) {
    sessionStorage.setItem("viewTime", Date.now());
  }
}
async function doLeave() {
  // console.log("=>", "离开页面");
  if (sessionStorage.getItem("viewTime") && sessionStorage.getItem("channel")) {
    const totalTime = Date.now() - +sessionStorage.getItem("viewTime");
    // console.log("=>", "浏览时长", `浏览了${totalTime / 1000}秒`);
    await trackViewBehavior({
      type: 7,
      viewTime: totalTime,
      origin: window.getAttribute("origin"),
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
