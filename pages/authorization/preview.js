// pages/authorization/preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '2021',
    month: '11',
    day: '9',
    compony: '寿光新红种子农业批发有限责任公司',
    variety: '番茄1号',
    id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    // const { index } = options
    this.setData({
      id: 2
    })
    // 把传输过来的值保存下来
    // 请求时间品种等字样渲染到页面去
  },
  change(){
    wx.redirectTo({
      url: '/pages/authorization/editauth?id='+this.data.id
    })
  },
  sure(){
    wx.navigateTo({
      url: '/pages/authorization/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // const data = new Date()
    // this.setData({
    //   year: data.getFullYear(),
    //   month: data.getMonth() + 1,
    //   day: data.getDate()
    // })
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