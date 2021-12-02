/*
 * @Date: 2021-12-01
 * @Description: 自动注册全局自定义指令
 */
import Vue from "vue";
// require.context("./", false, /\.vue$/)
const modulesFiles = require.context("./", true, /^\.\/(\w*\/)+index\.js$/);

// console.log("modulesFiles=>", modulesFiles, modulesFiles.keys());

modulesFiles.keys().forEach((modulePath) => {
  const name = modulePath.match(/(?<=\.\/).*?(?=\/index\.js)/)[0];
  const value = modulesFiles(modulePath).default;
  console.log("=>", name);
  Vue.directive(name, value);
});
