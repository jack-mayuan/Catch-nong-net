import {
  beSpacesBefore
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  onReady: function () {
    this.mockrequest()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      })
    }
  },
  data: {
    triggered: false, // 是否在下拉刷新中
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
    searchValue: '', //搜索框的值
    fuzzyResultArr: [],
    currentIndex: -1, //按照阅读量还是时间排序，默认一个都不选中，写成数字方便后面拓展模块
    option1: [{
        text: '阅读量降序',
        value: 0
      },
      {
        text: '阅读量升序',
        value: 1
      },
    ],
    option2: [{
        text: '时间降序',
        value: 0
      },
      {
        text: '时间升序',
        value: 1
      },
    ],
    option1Chose: {
      value: -1, //阅读量排序选中的值
      text: '阅读量', //阅读量排序选中的值
    },
    option2Chose: {
      value: -1, //时间排序选中的值
      text: '时间', //时间排序选中的值
    },
  },
  timeID: 1,
  init() {
    console.log('执行了init方法')
    this.timeID = 1
    this.setData({
      triggered: false, // 是否在下拉刷新中
      openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
      hint: '', // 上拉刷新结果提示文字
      isReachBottom: false, //是否触底，控制loading显示
      searchValue: '', //搜索框的值
      currentIndex: -1, //按照阅读量还是时间排序，默认一个都不选中，写成数字方便后面拓展模块
      option1Chose: {
        ...this.data.option1Chose,
        value: -1,
        text: '阅读量',
      },
      option2Chose: {
        value: -1, //时间排序选中的值
        text: '时间', //时间排序选中的值
      },
    })
    console.log('option1Chose', this.data.option1Chose)
  },
  // 搜索框事件开始------------------------------------------
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
  search(index) {
    // 搜索操作，搜索的时候会把模糊数组清空
    this.clearFuzzyArr()
    // 发起请求得到数据列表
    this.mockRequest()
  },
  fuzzyResultSearch(event) {
    // 点击了某一项会把模糊数组清空
    const fuzzyResultArr = this.data.fuzzyResultArr
    const {
      index
    } = event.detail
    this.clearFuzzyArr()
    console.log('fuzzyResultArr', fuzzyResultArr[index])
    this.setData({
      searchValue: fuzzyResultArr[index]
    })
    // 发起请求得到数据列表
    this.mockRequest()
  },
  clearFuzzyArr() {
    this.setData({
      fuzzyResultArr: []
    })
  },
  mockRequest() {
    const {
      option1Chose,
      option2Chose,
      searchValue
    } = this.data
    console.log('option1Chose, option2Chose,searchValue', option1Chose, option2Chose, searchValue)
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    });
    setTimeout(() => {
      Toast.clear();
    }, 1000)
  },
  RndNum(n) {
    var rnd = [];
    for (var i = 0; i < n; i++)
      rnd[i] = Math.floor(Math.random() * 100);
    return rnd;
  },
  // 搜索框事件开始------------------------------------------
  onRefresh() {
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 3000)
  },
  scrollBottom() {
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
  // 上拉加载，下拉刷新结束------------------------------
  todetails() {
    wx.navigateTo({
      url: '/pages/details/details'
    })
  },
  mockrequest() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    setTimeout(() => {
      Toast.clear()
    }, 1000)
  },
  change1({
    detail
  }) {
    this.setData({
      option1Chose: {
        ...this.data.option1[detail]
      },
    });
    console.log('detail', detail)
    this.mockrequest()
  },
  change2({
    detail
  }) {
    this.setData({
      option2Chose: this.data.option2[detail]
    });
    console.log('detail', detail)
    this.mockrequest()
  },

})