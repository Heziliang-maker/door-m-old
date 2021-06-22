/*
 * @Date: 2021-05-27
 */

module.exports = {
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      "^/shop-admin/v1": {
        target: "http://106.15.62.70:17804/",
        changOrigin: true,
      },
    },
  },
};
