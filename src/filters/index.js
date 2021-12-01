/*
 * @Date: 2021-12-01
 * @Description:
 */
import Vue from "vue";
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
