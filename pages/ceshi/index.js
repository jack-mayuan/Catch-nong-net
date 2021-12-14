// pages/ceshi/index.js
import { isImageFile } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg'
      }
    ]
  },
  properties: {

  },
  
  onPreviewImage(event) {
    console.log('onPreviewImage触发', !this.data.previewFullImage)
    var index = event.currentTarget.dataset.index;
    // console.log('index', index)
    var lists = this.data.imageArray;
    // console.log('lists', lists, index)
    var item = lists[index];
    console.log('ceshi',lists.filter(function (item) {
      return (0, isImageFile)(item);
    }))
    wx.previewImage({
      urls: lists.filter(function (item) {
        return (0, isImageFile)(item);
      }).map(function (item) {
        return item.url;
      }),
      current: item.url,
      fail: function () {
        wx.showToast({
          title: '预览图片失败',
          icon: 'none'
        });
      },
    });
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