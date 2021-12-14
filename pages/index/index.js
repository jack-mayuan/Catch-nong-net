import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import request from '../../utils/request';
// console.log('request',request);
import {
  isImageFile
} from '../../utils/util'
var app = getApp();
Page({
  onReady: function () {
    this.getData()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
  },
  data: {
    triggered: false, // 是否在下拉刷新中
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
    type: 'video', //展示视频还是图片
    searchValue: '',
    currentIndex: -1,
    videoList: [{
      uid: 1,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      isunfold: false, // 是否展开,指的是文字
      content: '内容前端上传文件的几种方式出于安全考量'
    }, {
      uid: 2,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      isunfold: false, // 是否展开
      content: '内容前端上传文件的几种方式出于安全考量'
    }, {
      uid: 3,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      isunfold: false, // 是否展开
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }, {
      uid: 4,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      isunfold: false, // 是否展开
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }, {
      uid: 5,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      isunfold: false, // 是否展开
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }],
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
        content: '内容前端上传本地的文件大家反大家反防抖',
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
        content: '内容前端上传文件的几种方式出于安全权文件',
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
        content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑',
        imageArray: [{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
          },
          {
            url: 'https://img.yzcdn.cn/vant/tree.jpg'
          }
        ]
      }
    ],
    preview: {
      isPreview: false,
      url: '',
      alt: '',
    }, //预览数据对象
    carouselArray: ['/images/home_top.jpg', '/images/home_top.jpg', '/images/home_top.jpg'],
    imageArray: [{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg'
      }
    ],
  },
  vid: '',
  videoContext: '',

    onRefresh() {
      console.log('触发了下拉刷新事件')
      this.getData()
      setTimeout(() => {
        this.setData({
          triggered: false,
        })
      }, 1000)
    },
    scrollBottom() {
      console.log('触发页底加载函数')
      this.getData()
      this.setData({
        isReachBottom: true,
        openhint: false
      })
      setTimeout(() => {
        this.setData({
          isReachBottom: false,
          openhint: true,
          hint: '已加载到最底部'
        })
      }, 2000)
    },
    // async getData(){
    //   const { data } = await request.get('***',{})
    // }
    getData() {
      const { type } = this.data
      console.log('type',type)
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      setTimeout(()=>{
        Toast.clear()
      },1000)
    },
    // 上拉加载，下拉刷新结束--------------------------
    // 预览图片
    onPreviewImage(event) {
      console.log('onPreviewImage触发', !this.data.previewFullImage)
      var {
        index,
        fatherindex
      } = event.currentTarget.dataset;
      // console.log('fatherindex,index',fatherindex,index)
      // imageArray必须要是http类型直接放到服务器上面的资源可以直接展示的
      var lists = this.data.picList[fatherindex].imageArray;
      var item = lists[index];
      // console.log('ceshi', lists.filter(function (item) {
      //   return (0, isImageFile)(item);
      // }))
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
    videoErrorCallback(e) {
      console.log('e', e)
    },
    onSearch() {
      Toast('搜索');
    },
    pause(e) {
      // Toast('暂停');
      // console.log('暂停e', e)
      var {
        index
      } = e.target.dataset
      const str = `videoList[${index}].show`
      this.setData({
        [str]: true
      })
    },
    bindplay(e) {
      let vid = e.currentTarget.id;
      console.log('触发了播放事件vid', vid, this.vid)
      console.log('this.videoContext', this.videoContext)
      if (this.vid !== vid && this.videoContext) {
        console.log('暂停上一个视频播放')
        this.videoContext.stop();
      }
      this.vid = vid;
      this.videoContext = wx.createVideoContext(this.vid, this);
      var {
        index
      } = e.target.dataset
      const str = `videoList[${index}].show`
      this.setData({
        [str]: false
      })
    },
    bindended(e) {
      Toast('结束');
      console.log('结束e', e)
      var {
        index
      } = e.target.dataset
      const str = `videoList[${index}].show`
      this.setData({
        [str]: true
      })
    },
    clickTitle() {
      console.log('clickTitle')
    },
    moreVideo() {
      wx.navigateTo({
        url: '/pages/videoMore/index'
      })
    },
    morePic() {
      wx.navigateTo({
        url: '/pages/picMore/index'
      })
    },
    clickPicText() { //点击了图文信息
      this.setData({
        type: 'picture',
        openhint: false,
        hint: ''
      })
      this.getData()
    },
    clickAdvertise() { //点击了宣传展示
      this.setData({
        type: 'video',
        openhint: false,
        hint: ''
      })
      this.getData()
    },
    unfold(e) {
      const {
        index
      } = e.currentTarget.dataset
      const str = `videoList[${index}].isunfold`
      this.setData({
        [str]: !this.data.videoList[index].isunfold
      })
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
    toMore(e) {
      const {
        type,
        identifier
      } = e.currentTarget.dataset
      if (type === 'video') {
        wx.navigateTo({
          url: '/pages/videoMore/index?identifier=' + identifier
        })
      } else {
        wx.navigateTo({
          url: '/pages/picMore/index?identifier=' + identifier
        })
      }
    }

})