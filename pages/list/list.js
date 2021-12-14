import {
  beSpacesBefore
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  onReady: function () {
    console.log('监听页面初次渲染完成')
    this.mockRequest()
  },
  onShow: function () {
    console.log('监听页面显示')
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 3
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
    roleCurrentIndex: -1, //种子公司，苗场，代办，供应链，选中按钮的下标
    isOpen: false, // 是否打开buttonArr选项
    buttonArr: ['选项一', '选项二', '选项三'], //供应链二级选项
    rateValue: 2, //诚信度的星星亮几颗
    listArr: [{
        switchFold: false, // 名片夹子选项的开关
        isChoseFold: '', // 
      },
      {
        switchFold: false, // 名片夹子选项的开关
        isChoseFold: '意向客户', // 
      },
      {
        switchFold: false, // 名片夹子选项的开关
        isChoseFold: '洽谈客户', // 
      },
      {
        switchFold: false, // 名片夹子选项的开关
        isChoseFold: '成交客户', // 
      }
    ],
    buttonList: [{
      id: 1,
      text: '种子公司',
    }, {
      id: 2,
      text: '苗场',
    }, {
      id: 3,
      text: '代办',
    }, {
      id: 4,
      text: '供应链',
    }], //按钮列表
    option1: [{
        text: '时间降序',
        value: 0
      },
      {
        text: '时间升序',
        value: 1
      },
    ], //按时间排序列表
    option2: [{
        text: '诚信度降序',
        value: 0
      },
      {
        text: '诚信度升序',
        value: 1
      },
    ], //按诚信度排序列表
    option3: [{
        text: '实力降序',
        value: 0
      },
      {
        text: '实力升序',
        value: 1
      },
    ], //按实力排序列表
    option1Chose: {
      value: -1,
      title: '时间'
    },
    option2Chose: {
      value: -1,
      title: '诚信度'
    },
    option3Chose: {
      value: -1,
      title: '实力'
    },
    foldArr: ['意向客户', '洽谈客户', '成交客户'] //加入名片夹那里的数据数组
  },
  timeID: 1,
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
      searchValue,
      option3Chose,
      option2Chose,
      option1Chose,
      roleCurrentIndex,
      buttonList
    } = this.data
    console.log('请求值', {
      searchValue,
      option3Chose,
      option2Chose,
      option1Chose,
      role: roleCurrentIndex ? '' : buttonList[roleCurrentIndex].text
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
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
      isReachBottom: true
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
  //上拉加载，下拉刷新结束-----------------------------
  toCompany(e) {
    const {
      index
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/companyDetails/index?id=' + index
    })
  },
  toPersonalList() {
    var id = 1
    wx.navigateTo({
      url: '/pages/personalList/index?id=' + id
    })
  },
  tosqpage() {
    wx.navigateTo({
      url: '/pages/authorization/myAuthorization'
    })
  },
  await () {
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
      option1Chose: this.data.option1[detail]
    });
    this.mockRequest()
  },
  change2({
    detail
  }) {
    this.setData({
      option2Chose: this.data.option2[detail]
    });
    this.mockRequest()
  },
  change3({
    detail
  }) {
    this.setData({
      option3Chose: this.data.option3[detail]
    });
    this.mockRequest()
  },
  //点击了按钮
  roleClick(e) {
    const {
      index
    } = e.target.dataset
    if (index === 3) {
      console.log('点击了供应链')
      this.setData({
        isOpen: !this.data.isOpen
      })
    } else {
      this.setData({
        roleCurrentIndex: index,
        isOpen: false
      })
      this.await()
    }
  },
  rateChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  // 二级按钮
  checkone(e) {
    const {
      value2
    } = e.target.dataset
    console.log('value2', value2)
    const str = `buttonList[3]`
    this.setData({
      isOpen: false,
      roleCurrentIndex: 3,
      [str]: {
        ...this.data.buttonList[value2],
        text: value2
      }
    })
    // console.log('index',index)
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    setTimeout(() => {
      Toast.clear()
    }, 1000)
  },
  switchSubfollow(e) {
    // console.log('switchSubfollow')
    const {
      index
    } = e.currentTarget.dataset
    var str = `listArr[${index}].switchFold`
    this.setData({
      [str]: !this.data.listArr[index].switchFold
    })
  },
  nameCardClick(e) {
    const {
      subindex,
      index
    } = e.currentTarget.dataset
    // console.log(subindex,index)
    switch (subindex) {
      case 0:
        console.log('意向客户');
        this.closeSwitchSubfollow(index,subindex);
        break;
      case 1:
        console.log('洽谈客户');
        this.closeSwitchSubfollow(index,subindex);
        break;
      case 2:
        console.log('成交客户');
        this.closeSwitchSubfollow(index,subindex);
        break;
      default:
        break;
    }
  },
  closeSwitchSubfollow(index,subindex) {
    console.log('closeSwitchSubfollow',index,this.data.foldArr[index])
    var str = `listArr[${index}].switchFold`
    var str2 = `listArr[${index}].isChoseFold`
    this.setData({
      [str]: !this.data.listArr[index].switchFold,
      [str2]: this.data.foldArr[subindex]
    })
  }

})