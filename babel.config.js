module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    production: {
      // 线上打包去除console
      plugins: ["transform-remove-console"],
    },
  },
};
