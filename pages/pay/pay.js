// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: '公司名', // 公司名
    firstRole: '一级角色', //一级角色
    secondRole: '二级角色 ', // 二级角色 
    name: '姓名', // 姓名
    memberPrice: '会员价格',  // 会员价格
  },
  topayState(){
    // 调起支付接口，如果支付成功跳转到等待页面
    wx.navigateTo({
      url: '/pages/pay/payState'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.authorize({
    //   scope: "scope.userInfo",
    //   success () {
    //     console.log('已经授权成功')
    //   },
    //   fail (err) {
    //     console.log('授权调用失败',err)
    //   }
    // })
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