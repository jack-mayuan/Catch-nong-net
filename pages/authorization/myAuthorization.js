// pages/authorization/myAuthorization.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
  },
  onRefresh(){
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 3000)
  },
  scrollBottom() {
    console.log('触发页底加载函数')
    this.getData()
  },
  getData() {
    this.setData({
      isReachBottom: true,
      openhint: false
    })
    // 模拟发出请求
    setTimeout(() => {
      this.setData({
        isReachBottom: false,
        openhint: true,
        hint: '已加载到最底部'
      })
    }, 2000)
  },
  canclesq(e){
    const { index } = e.currentTarget.dataset
    Dialog.confirm({
      title: '确定要取消该授权吗？',
    })
    .then(() => {
      console.log('点击了确认',index)
      // 调用删除接口
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