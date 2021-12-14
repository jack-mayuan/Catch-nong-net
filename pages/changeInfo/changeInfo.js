// pages/changeInfo/changeInfo.js
import {
  isImageFile,
  isEmpty,
  selectFormat,
  phoneFormat
} from '../../utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleValue: '', // 姓名
    jobValue: '经理', // 职位名称
    jobIndex: -1, // 职位下标
    jobOption: [{
      value: 0,
      text: '经理'
    }, {
      value: 1,
      text: '员工'
    }, {
      value: 2,
      text: '销售'
    }, ], // 职位选项
    phoneValue: '', // 电话号码初始值
    addressValue: '', // 收货地址
    fileList: [{
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
    }]
  },
  // 预览图片
  onPreviewImage(event) {
    console.log('onPreviewImage触发', !this.data.previewFullImage)
    var index = event.currentTarget.dataset.index;
    // fileList中对象url必须是http等直接放在服务器上面的资源
    var lists = this.data.fileList;
    // console.log('lists', lists,)
    var item = lists[index];
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
  afterRead(event) {
    console.log('执行了afterRead')
    const {
      file
    } = event.detail;
    // const { fileList = [] } = this.data;
    let fileList = []
    fileList.push({
      ...file
    });
    this.setData({
      fileList
    });
  },
  changeJob(e) {
    console.log('触发了changeJob', e.detail)
    this.setData({
      jobValue: this.data.jobOption[e.detail].text,
      jobIndex: e.detail
    })
  },
  sure() {
    const {titleValue,jobIndex,jobValue,phoneValue,addressValue} = this.data

    if (isEmpty(titleValue, '姓名') && selectFormat(jobIndex, '职位')&& phoneFormat(phoneValue, '电话') && isEmpty(addressValue, '地址')) {
      Toast('全部都上传完成允许提交')
    }
  },
  back() {
    wx.navigateBack({
      delta: 1
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