// pages/authorization/editauth.js
import { testFormat } from '../../utils/util'
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '',
    month: '',
    day: '',
    variety: ''
  },
  save(){
    const {variety} = this.data
    if(testFormat(variety,"授权品种")){
      // 发起保存请求，请求成功后跳转到预览页面
      console.log('验证通过可以注册')
      var id = 1
      wx.navigateTo({
        url: '/pages/authorization/preview?id='+id
      })
    }else{
      console.log('走了else')
    }
  },
  bindKeyInput(e){
    const { value } = e.detail
    console.log('value',value)
    this.setData({
      variety: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    // const { id } = options
    // 把传输过来的值保存下来
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const data = new Date()
    this.setData({
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate()
    })
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