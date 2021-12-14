// pages/picMore/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import {
  beSpacesBefore
} from '../../utils/util.js'
import {
  isImageFile
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    triggered: false, // 是否在下拉刷新中
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
    searchValue: '',
    title: '',
    fuzzyResultArr: [],
    picList: [{
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全考',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全考量',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      },
      {
        isunfold: false, // 是否展开,指的是文字
        content: '内容前端上传文件的几种方式出于安全考量,操',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      }
    ],
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
    const { searchValue,title } = this.data
    console.log('searchValue,title',searchValue,title)
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
  onPreviewImage(event) {
    console.log('onPreviewImage触发', !this.data.previewFullImage)
    var {index,fatherindex} = event.currentTarget.dataset
    // console.log('fatherindex,index',fatherindex,index)
    // imageArray必须要是http类型直接放到服务器上面的资源可以直接展示的
    var lists = this.data.picList[fatherindex].imageArray;
    var item = lists[index];
    console.log('ceshi', lists.filter(function (item) {
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
  picunfold(e) {
    const {
      index
    } = e.currentTarget.dataset
    const str = `picList[${index}].isunfold`
    this.setData({
      [str]: !this.data.picList[index].isunfold
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { identifier='' } = options
    if(!!identifier){
      // 如果有传这个值过来，就将这个值设置为title
      wx.setNavigationBarTitle({
        title: identifier
      })
      this.setData({
        title: identifier
      })
      // 如果是从品种展示等跳转过来的那么请求数据的时候就会带上这个一级角色
    }else{
      // console.log('没有拿到identifier',identifier)
    }
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