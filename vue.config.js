/*
 * @Date: 2021-05-27
 */

const Timestamp = new Date().getTime();
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
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
      "^/shop/v1": {
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
      config.output.filename("js/[name]." + Timestamp + ".js").end();
      config.output.chunkFilename("js/[name]." + Timestamp + ".js").end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `css/[name].${Timestamp}.css`,
          chunkFilename: `css/[name].${Timestamp}.css`,
        },
      ]);
    }
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.module.rule("scss").oneOfs.store.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [
            resolve("src/styles/variables.scss"),
            resolve("src/styles/index.scss"),
            resolve("src/styles/mixins.scss"),
          ],
        })
        .end();
    });
  },
};
