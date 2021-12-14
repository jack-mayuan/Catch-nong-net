import {
  areaList
} from '@vant/area-data';
import {
  beSpacesBefore
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  onReady: function () {
    this.mockRequest()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
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
    readingAmount: false, //按照阅读量排序,false是阅读量降序
    choseSwitch: false, //筛选对一个的布尔值
    choseRegOrRes: -1, //表示地区还是抗性
    choseRegion: false, //按照地区选择的组件是否打开
    choseResistance: false, //按照抗性选择的组件是否打开
    currentIndex: -1, //种子公司，苗场，代办，供应链等选中的哪一个
    currentIndex2: 2, //宣传展示，图文信息，行业报告等选中的是哪一个
    currentIsOkIndex: 2, //用于解决视频数据回来之后再渲染bug，不然实例传过来不能点击一个关闭另一个
    buttonList: ['种子公司', '苗场', '代办', '供应链'], //按钮数组
    buttonList2: ['宣传展示', '图文信息', '行业报告'], //第二排按钮数组    
    isOpen: false, // 是否打开buttonArr选项
    buttonArr: ['选项一', '选项二', '选项三'], //供应链二级选项
    areaList, //省市区数据
    value: 330302, //选中的一个省市区
    province: {}, //最后用来发送请求的省
    city: {}, //最后用来发送请求的市
    region: {}, //最后用来发送请求的区
    oneNavigation: [{
        key: "xihongshi",
        name: "西红柿"
      },
      {
        key: "huanggua",
        name: "黄瓜"
      }
    ], //抗性下面的一级目录
    oneNavCurIndex: -1, // 抗性下面的一级目录选中的是哪一个
    twoNavgation: [],
    falsetwoNavgation: [{
        key: 'hongsizi',
        title: "粉柿子",
        resistanceArr: [{
            id: 1,
            name: "抗性4",
            check: false
          },
          {
            id: 2,
            name: "抗性5",
            check: false
          },
          {
            id: 3,
            name: "抗性6",
            check: false
          },
          {
            id: 4,
            name: "抗性7",
            check: false
          }
        ]
      },
      {
        key: 'hongsizi',
        title: "红柿子",
        resistanceArr: [{
            id: 1,
            name: "抗性4",
            check: false
          },
          {
            id: 2,
            name: "抗性5",
            check: false
          },
          {
            id: 3,
            name: "抗性6",
            check: false
          },
          {
            id: 4,
            name: "抗性7",
            check: false
          }
        ]
      }
    ], //抗性数组
    choseResistanceStr: '', //选中的值转换而成的数组
    dataList: [{
      type: 'article',
    }],
    data1: [{
      type: 'picture',
      isunfold: false, // 是否展开,指的是文字
      content: '内容前端上传文件的几种方式出于安全的花大大大大',
      imageArray: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        },
        {
          url: 'https://img.yzcdn.cn/vant/tree.jpg'
        }
      ]
    }],
    data2: [{
      type: 'article',
    }, ],
    data3: [{
        type: 'video',
        uid: 1,
        title: "黄瓜技术培训视频",
        cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
        resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        show: true,
        company: "寿光汇坤商贸有限公司",
        time: "0000-00-00",
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
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
        isunfold: false, // 是否展开
        content: '内容前端上传文件的几'
      }
    ],
    choseArr: []
  },
  timeID: 1,
  // 收索框方法开始----------------------------------------------
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
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    setTimeout(() => {
      Toast.clear()
      if (this.data.currentIndex2 === 0) {
        this.setData({
          dataList: this.data.data3,
          currentIsOkIndex: 0
        })
      } else if (this.data.currentIndex2 === 1) {
        this.setData({
          dataList: this.data.data1,
          currentIsOkIndex: 1
        })
      } else {
        this.setData({
          dataList: this.data.data2,
          currentIsOkIndex: 2
        })
      }
    }, 500)
    const {
      searchValue,
      readingAmount,
      province,
      city,
      region,
      choseArr,
      currentIndex,
      currentIndex2,
      buttonList
    } = this.data
    const currentValue = buttonList[currentIndex]
    console.log('请求的值有', {
      searchValue,
      readingAmount,
      province,
      city,
      region,
      choseArr,
      currentIndex,
      currentValue,
      currentIndex2
    })
  },
  RndNum(n) {
    var rnd = [];
    for (var i = 0; i < n; i++)
      rnd[i] = Math.floor(Math.random() * 100);
    return rnd;
  },
  // 搜索框方法结束----------------------------------------------
  onRefresh() {
    console.log('触发了下拉刷新事件')
    this.mockRequest()
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 1000)
  },
  scrollBottom() {
    console.log('触发了上拉加载事件')
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
  todetails() {
    wx.navigateTo({
      url: '/pages/searchDetails/index'
    })
  },
  // 按照抗性选择
  becomeRes() {
    if (this.data.choseRegOrRes === 1) {
      this.setData({
        choseRegOrRes: -1,
        choseResistance: false, //关闭按抗性选择组件
        // oneNavCurIndex: -1, //关闭一级选中的水果
        // twoNavgation: [],
      })
    } else {
      this.setData({
        choseRegOrRes: 1,
        choseRegion: false, //不等于1，则地区选择组件关闭
        choseResistance: true, //不等于1，按照抗性选择组件打开
        // oneNavCurIndex: 0, //默认选择第一个
      })
    }
  },
  // 按照地区选择
  becomeReg() {
    if (this.data.choseRegOrRes === 0) {
      this.setData({
        choseRegOrRes: -1,
        choseRegion: false
      })
    } else {
      this.setData({
        choseRegOrRes: 0,
        choseRegion: true,
        choseResistance: false
      })
    }
  },
  // 点击了按照阅读量进行排序事件
  sortReadQuantity() {
    console.log('触发了按照阅读量排序事件')
    // this.clearResistance()
    this.setData({
      readingAmount: !this.data.readingAmount
    })
    this.mockRequest()
  },
  // 筛选按钮触发事件
  choose() {
    if (!this.data.choseSwitch) { //如果是关闭的时候，就打开
      if (this.data.choseResistanceStr) {
        this.setData({
          choseSwitch: !this.data.choseSwitch,
        })
      } else {
        this.setData({
          choseSwitch: !this.data.choseSwitch,
          oneNavCurIndex: 0,
          twoNavgation: JSON.parse(JSON.stringify(this.data.falsetwoNavgation))
        })
      }
    } else {
      // 是打开的时候点击，并且抗性选择组件是打开的，那么就关闭
      this.setData({
        choseSwitch: !this.data.choseSwitch,
        // 关闭按照抗性选择组件
        choseRegOrRes: -1,
        choseResistance: false,
        // oneNavCurIndex: -1, //关闭一级选中的水果
        // twoNavgation: [],
      })
    }
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
      currentIndex: 3,
      [str]: value2
    })
    this.mockRequest()
  },
  // 种子公司，苗场，代办，供应链四个按钮触发的对应事件
  onClick(e) {
    console.log('点击了按钮')
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
        currentIndex: index,
        isOpen: false
      })
      this.mockRequest()
    }
  },
  // 关闭地区弹出层时触发
  hideBottom() {
    console.log('关闭弹出层时触发')
    this.setData({
      choseRegOrRes: -1,
      choseRegion: false
    })
  },
  // 选择地区改变事件
  areaChange(e) {
    console.log('触发areaChange', e)
  },
  // 选择地区确认事件
  areaConfirm(e) {
    console.log('触发areaConfirm', e)
    // console.log('value',this.data.value)
    // const { values } = details
    this.setData({
      choseRegOrRes: -1,
      choseRegion: false
    })
    const arr = e.detail.values
    // console.log('arr',arr)
    this.setData({
      province: arr[0],
      city: arr[1],
      region: arr[2]
    })
    this.mockRequest()
  },
  // 选择地区取消事件
  areaCancel() {
    console.log('触发areaCancel')
    this.setData({
      choseRegOrRes: -1,
      choseRegion: false
    })
  },
  // 点击一级抗性标题
  clickOneNav(e) {
    const {
      index
    } = e.target.dataset
    this.setData({
      oneNavCurIndex: index
    })
    // 发起请求请求第二级菜单数据
    this.setData({
      twoNavgation: JSON.parse(JSON.stringify(this.data.falsetwoNavgation))
    })
  },
  // 点击二级具体抗性
  clickResistance(e) {
    const {
      index,
      subindex
    } = e.target.dataset
    // console.log('e', e, index, subindex)
    var str = `twoNavgation[${index}].resistanceArr[${subindex}].check`
    this.setData({
      [str]: !this.data.twoNavgation[index].resistanceArr[subindex].check,
    })
    var lists = this.data.twoNavgation
    var newList = []
    lists.forEach(function (value, index, array) {
      value.resistanceArr.forEach(function (subValue, subindex, arr) {
        // console.log(subValue.name)
        if (subValue.check) {
          newList.push(subValue.name)
        }
      })
    })
    this.setData({
      choseArr: newList,
      choseResistanceStr: newList.join(',')
    })
  },
  // 清空函数，当需要收起筛选的时候调用
  clearResistance() {
    console.log('触发了清空筛选条件的函数')
    this.setData({
      choseSwitch: false,
      choseRegion: false,
      choseResistance: false,
      choseRegOrRes: -1,
      // oneNavCurIndex: -1, // 一级选中下标
      // twoNavgation: [], // 二级导航
    })
  },
  //重置触发的事件
  reset() {
    // 重新拿到二级抗性，赋值给twoNavgation
    console.log('触发了重置事件')
    this.setData({
      twoNavgation: JSON.parse(JSON.stringify(this.data.falsetwoNavgation)),
      choseResistanceStr: '',
    })
    console.log('twoNavgation', this.data.falsetwoNavgation, this.data.twoNavgation)
  },
  sure() {
    console.log('点击了确定按钮')
    // 发送请求，去搜索数据，成功之后调用clearResistance清空抗性的条件，
    this.clearResistance()

    this.mockRequest()
  },
  // 搜索到的内容部分------------------------------------------------------------
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
    const {
      vid,
      that,
      index
    } = event.detail
    console.log('触发了播放事件vid', vid, this.vid)
    console.log('this.videoContext', this.videoContext)
    if (this.vid !== vid && this.videoContext) {
      console.log('暂停上一个视频播放')
      this.videoContext.stop();
    }
    this.vid = vid
    this.videoContext = wx.createVideoContext(vid, that)
    const str = `dataList[${index}].show`
    this.setData({
      [str]: false
    })
  },
  dispType(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      currentIndex2: index,
      openhint: false,
      hint: ''
    })
    this.mockRequest()
  },
})