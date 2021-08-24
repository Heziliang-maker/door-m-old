/*
 * @Date: 2021-05-27
 */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      "^/shop-admin/v1": {
        target: "http://106.15.62.70:17804/",
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    // 打包分析
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
};
