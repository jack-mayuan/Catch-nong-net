import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch: false, //是否阅读同意协议
    userInfo: {}, 
    hasUserInfo: false
  },
  haveRead(e) {
    if (this.data.switch) {
      console.log("已经阅读")
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // app.globalData.userInfo = res.userInfo;
          // console.log('app1',app)
          wx.setStorageSync('userInfo', res.userInfo)
          wx.navigateTo({
            url: '/pages/register/register'
          })
        }
      })
    } else {
      Toast('请勾选已阅读并同意协议');
    }
  },
  switchChange(e) {
    this.setData({
      switch: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})