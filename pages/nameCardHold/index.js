// pages/nameCardHold/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    foldArr: ['意向客户','洽谈客户', '成交客户'], //加入名片夹那里的数据数组
    itemArray: [{
      switchFold: false, // 名片夹子选项的开关
      id: 0
    },
    {
      switchFold: false, // 名片夹子选项的开关
      id: 1
    },
    {
      switchFold: false, // 名片夹子选项的开关
      id: 2
    },
    {
      switchFold: false, // 名片夹子选项的开关
      id: 3
    }],
    isReachBottom: false,
    triggered: false,//是否在下拉刷新状态中
    openhint: '',//是否打开提示语
    hint: '',//提示语
  },
  clickClient1() {
    this.setData({
      currentIndex: 0
    })
  },
  clickClient2() {
    this.setData({
      currentIndex: 1,
    })
  },
  clickClient3() {
    this.setData({
      currentIndex: 2
    })
  },
  switchSubfollow(e) {
    const {
      index
    } = e.currentTarget.dataset
    var str = `itemArray[${index}].switchFold`
    this.setData({
      [str]: !this.data.itemArray[index].switchFold
    })
  },
  nameCardClick(e) {
    const {
      subindex,
      index
    } = e.currentTarget.dataset
    this.closeSwitchSubfollow(index,subindex);
  },
  closeSwitchSubfollow(index,subindex) {
    console.log('closeSwitchSubfollow',index,subindex)
    var str = `itemArray[${index}].switchFold`
    this.setData({
      [str]: !this.data.itemArray[index].switchFold
    })
    // 发起请求成功之后将这条数据从当前数据栈中移除掉
    setTimeout(()=>{
      this.setData({
        itemArray: this.data.itemArray.filter(function(Value, CurrentIndex){
          return CurrentIndex!==index
        }) 
      })
      // console.log('itemArray',this.data.itemArray)
    },500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad一个页面只会加载一次')
    this.mockRequest()
    // wx.request({
    //   url: httpUrl.getContentList,
    //   data: { "type": "news_normal", "offset": 0, "limit": -1, },
    //   method:"post",
    //   //header也可以写成配置那样的形式
    //   header: {
    //     "Content-Type": httpUrl.contentType
    //   },
    //   //回调函数中使用箭头函数，改变this的指向。
    //   success:res=>{
    //     console.log(res);
    //     console.log(this.data.test);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady页面初次渲染完成时触发。一个页面只会调用一次')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow页面显示/切入前台时触发')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide页面隐藏/切入后台时触发。')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUnload页面卸载时触发。')
  },
  //刷新
  onRefresh() {
    console.log('触发下拉刷新')
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 3000)
  },
  scrollBottom() {
    console.log('触发上拉加载')
    this.getData()
  },
  mockRequest() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    setTimeout(() => {
      Toast.clear();
    }, 1000)
  },
  //页面是否加载到最底部
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
  clickDelete(e){
    const {index} = e.currentTarget.dataset
    Dialog.confirm({
      title: '确定要将该客户移除名片夹吗',
    }).then(() => {
      // on confirm
      // 点击了确定删除
      setTimeout(()=>{
        this.setData({
          itemArray: this.data.itemArray.filter(function(Value, CurrentIndex){
            return CurrentIndex!==index
          }) 
        })
        // console.log('itemArray',this.data.itemArray)
      },500)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   console.log('触发了下拉刷新')
  //   this.onRefresh()
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log('触发到页面底部')
  //   this.setData({
  //     isReachBottom: true
  //   })
  //   setTimeout(() => {
  //     this.setData({
  //       itemArray: [...this.data.itemArray, 1, 2, 3],
  //       isReachBottom: false
  //     })
  //   }, 3000)
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "首页",
      path:`/pages/index/index` 
    }
  },
  // onShareTimeline(){
  //   return {
  //     title: '名片夹管理'
  //   }
  // }
})