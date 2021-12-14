// app.js
App({
  onLaunch() {
    console.log('app.js>onLaunch')
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.setStorageSync('key', 'value')
    // console.log('getkey',wx.getStorageSync('key'))
    // wx.removeStorageSync('key')
    // wx.clearStorageSync()
  },
  onShow() {},
  onHide() {},
  globalData: {
    userInfo: null
  }
})