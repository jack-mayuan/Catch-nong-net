// pages/ceshi3/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      {
        type: 'picture',
        isunfold: false, // 是否展开,指的是文字
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        type: 'article',
        isunfold: false, // 是否展开,指的是文字
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        type: 'video',
        uid: 1,
        title: "黄瓜技术培训视频",
        cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
        resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        show: true,
        company: "寿光汇坤商贸有限公司",
        time: "0000-00-00",
        isunfold: false // 是否展开,指的是文字
      },
      { 
        type: 'video',
        uid: 2,
        title: "黄瓜技术培训视频",
        cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
        resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        show: true,
        company: "寿光汇坤商贸有限公司",
        time: "0000-00-00",
        isunfold: false // 是否展开
      }
    ],
  },
  vid: '',
  videoContext: '',
  picunfold(event) {
    // 修改父元素的展示属性
    const {
      fatherindex: index
    } = event.detail
    const str = `dataList[${index}].isunfold`
    this.setData({
      [str]: !this.data.dataList[index].isunfold
    })
  },
  unfold(event) {
    const {
      index
    } = event.detail
    const str = `dataList[${index}].isunfold`
    this.setData({
      [str]: !this.data.dataList[index].isunfold
    })
  },
  pause(event) {
    const {
      index
    } = event.detail
    const str = `dataList[${index}].show`
    this.setData({
      [str]: true
    })
  },
  bindplay(event) {
    const { vid,that,index } = event.detail
    console.log('触发了播放事件vid', vid, this.vid)
    console.log('this.videoContext', this.videoContext)
    if (this.vid !== vid && this.videoContext) {
      console.log('暂停上一个视频播放')
      this.videoContext.stop();
    }
    this.vid = vid
    this.videoContext = wx.createVideoContext(vid,that)
    const str = `dataList[${index}].show`
    this.setData({
      [str]: false
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