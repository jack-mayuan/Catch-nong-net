// pages/authorization/index.js
import {
  beSpacesBefore
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    triggered: false, // 是否在下拉刷新中
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
    sqButton: 'sq', // 我的授权还是我要授权sq,mysq
    radioShape: -1,
    searchValue: '',//搜索框的值
    fuzzyResultArr: [],//模糊查找还回回来的数组
  },
  timeID: 1,
  input(event) {
    clearTimeout(this.timeID)
    this.timeID = setTimeout(() => {
      // 打字会把模糊数组赋值
      const {
        value
      } = event.detail
      this.setData({
        searchValue: value
      })
      if (!value) { //没有了value值则清空模糊查找的数组
        this.setData({
          fuzzyResultArr: []
        })
        return;
      }
      if (value && !beSpacesBefore(value)) {
        // 发起请求获取模糊数组
        clearTimeout(this.timeID)
        this.timeID = setTimeout(() => {
          this.setData({
            fuzzyResultArr: this.RndNum(5)
          })
        }, 200)
      }
    }, 100)
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
    this.setData({searchValue: fuzzyResultArr[index]})
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
  // -------------------------收索框
  onRefresh() {
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
  // 上拉加载，下拉刷新结束--------------------------
  sureAuthority(){
    if(this.data.radioShape!== -1){
      wx.navigateTo({
        url: '/pages/authorization/editauth?index='+this.data.radioShape
      })
    }else{
      Toast('请选择要授权的公司');
    }
    console.log('radioShape',this.data.radioShape)
  },
  onChangeradio(event){
    this.setData({ radioShape: event.detail });
    // console.log('event',event)
  },
  tosq(){
    this.setData({
      sqButton: 'sq'
    })
  },
  tomysq(){
    this.setData({
      sqButton: 'mysq'
    })
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