// pages/my/myHonesty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yellowHartArray: [],
    grayHartArray: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 0-19 代表0颗星
    // 20-39 代表1颗星
    // 40-59 代表2颗星
    // 60-79 代表3颗星
    // 80-99 代表4颗星
    // 100 代表0颗星
    let score = 65
    let n = parseInt(score/20)
    let m = 5 - n
    for(let i = 1; i <= n; i++){
      this.setData({yellowHartArray: [...this.data.yellowHartArray,1]})
    }
    for(let i = 1; i <= m; i++){
      this.setData({grayHartArray: [...this.data.grayHartArray,1]})
    }
    console.log('n,m',n,m)
    console.log('yellowHartArray',this.data.yellowHartArray)
    console.log('grayHartArray',this.data.grayHartArray)
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