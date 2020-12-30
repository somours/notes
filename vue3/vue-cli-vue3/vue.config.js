module.exports = {
  configureWebpack: config => {
    config.entry.app = ['./src/main.ts']
  },
  chainWebpack: config => {
    config.devServer.proxy({
      "/api": {
        target: "http://47.110.74.37:7001/"
      }
    });
  },
  css: {
    loaderOptions: {
      stylus: {
        import: ["~@/assets/styles/mixin.styl"]
      }
    }
  }
};
