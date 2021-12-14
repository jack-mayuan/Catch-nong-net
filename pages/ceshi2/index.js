// pages/ceshi2/index.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    fuzzyResultArr: [],
  },
  timeID: 1,
  // 搜索框事件开始------------------------------------------
  input(event){
    // 打字会把模糊数组赋值
    const { value } = event.detail
    this.setData({
      searchValue: value
    })
    if (value) {
      // 发起请求获取模糊数组
      clearTimeout(this.timeID)
      this.timeID = setTimeout(() => {
        console.log('防抖成功')
        this.setData({
          fuzzyResultArr: this.RndNum(5)
        })
      }, 1000)
    } else {
      this.setData({
        fuzzyResultArr: []
      })
    }
  },
  search(index){
    // 搜索操作，搜索的时候会把模糊数组清空
    this.clearFuzzyArr()
    // 发起请求得到数据列表
    this.mockRequest()
  },
  fuzzyResultSearch(event){
    // 点击了某一项会把模糊数组清空
    const fuzzyResultArr = this.data.fuzzyResultArr
    const { index } = event.detail
    this.clearFuzzyArr()
    console.log('fuzzyResultArr',fuzzyResultArr[index])
    // 发起请求得到数据列表
    this.mockRequest()
  },
  clearFuzzyArr(){
    this.setData({
      fuzzyResultArr: []
    })
  },
  mockRequest(){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    setTimeout(()=>{
      Toast.clear();
    },1000)
  },
  RndNum(n){
    var rnd=[];
    for(var i=0;i<n;i++)
        rnd[i] = Math.floor(Math.random()*100);
    return rnd;
  },
  // 搜索框事件开始------------------------------------------
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