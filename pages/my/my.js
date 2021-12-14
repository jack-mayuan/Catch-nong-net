var app = getApp();
Page({
  onReady: function () {
    console.log('监听页面初次渲染完成')
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  onShow: function () {
    console.log('监听页面显示')
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 4
      })
    }
  },
  data: {
    publishShow: false, //发布时选择发布图片还是视频的弹窗
    show: false, // 这里是用于显示假的内容的
    userInfo: {}
  },
  toAuthorization() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        app.globalData.userInfo = res.userInfo;
        console.log('全局用户数据', app.globalData.userInfo)
      }
    })
  },
  toauthorization() {
    wx.navigateTo({
      url: '/pages/authorization/index'
    })
  },
  tonameCardHold() {
    wx.navigateTo({
      url: '/pages/nameCardHold/index'
    })
  },
  tomystrength() {
    wx.navigateTo({
      url: '/pages/my/mystrength'
    })
  },
  tomyHonesty() {
    wx.navigateTo({
      url: '/pages/my/myHonesty'
    })
  },
  tochangeInfo() {
    wx.navigateTo({
      url: '/pages/changeInfo/changeInfo'
    })
  },
  tocomplaint() {
    wx.navigateTo({
      url: '/pages/complaint/index'
    })
  },
  topublishPicture() {
    this.setData({
      publishShow: false
    })
  },
  hidePublish() {
    this.setData({
      publishShow: false,
      type: '1'
    })
  },
  publish() {
    this.setData({
      publishShow: true
    })
    // wx.hideTabBar({
    //   success(){
    //     console.log('接口调用成功')
    //   },
    //   fail(e){
    //     console.log('接口调用失败',e)
    //   }
    // })
  },
})