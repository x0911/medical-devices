module.exports = {
  transpileDependencies: ["vuetify", "@firebase"],
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
};
