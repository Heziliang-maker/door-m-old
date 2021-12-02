/*
 * @Date: 2021-12-02
 * @Description:
 */
/*
 * @Date: 2021-04-18
 * @Description:
 */

import Vue from "vue";

function registerAllComponents(requireContext) {
  return requireContext.keys().forEach((comp) => {
    const vueComp = requireContext(comp);
    const compName = vueComp.name
      ? vueComp.name.toLowerCase()
      : /\/([\w-]+)\.vue$/.exec(comp)[1];
    Vue.component(compName, vueComp.default);
    console.log("=>", compName);
  });
}

registerAllComponents(require.context("./", false, /\.vue$/));
// require.context
// 可以通过 require.context() 函数来创建自己的 context。

// 可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
