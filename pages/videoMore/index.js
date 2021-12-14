// pages/videoMore/index.js
import {
  beSpacesBefore
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    triggered: false, // 是否在下拉刷新中
    openhint: false, // 是否开启上拉刷新的结果提示，只有刷新失败或者数据加载结束才会开启
    hint: '', // 上拉刷新结果提示文字
    isReachBottom: false, //是否触底，控制loading显示
    searchValue: '',
    title: '', //标题，当点击的不是更多的时候传过来会有值
    fuzzyResultArr: [],
    videoList: [{
      uid: 1,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      content: '内容前端上传文件的几种'
    }, {
      uid: 2,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      content: '内容前端上传文件的几种方式出于安全考率'
    }, {
      uid: 3,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }, {
      uid: 4,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }, {
      uid: 5,
      title: "黄瓜技术培训视频",
      cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
      resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      show: true,
      company: "寿光汇坤商贸有限公司",
      time: "0000-00-00",
      content: '内容前端上传文件的几种方式出于安全考量,操作系统分配给浏览器的权限较低,而单个网页所拥有对用户电脑操作的权限就更低了,这是为了防止因用户的操作不当导致恶意网页随意增删改动用户本地的文件'
    }],
  },
  fuzzyResultSearch(event){
    // 点击了某一项会把模糊数组清空
    const fuzzyResultArr = this.data.fuzzyResultArr
    const { index } = event.detail
    this.clearFuzzyArr()
    console.log('fuzzyResultArr',fuzzyResultArr[index])
    this.setData({
      searchValue: fuzzyResultArr[index]
    })
    // 发起请求得到数据列表
    this.mockRequest()
  },
  clearFuzzyArr(){
    this.setData({
      fuzzyResultArr: []
    })
  },
  mockRequest(){
    const { searchValue,title } = this.data
    console.log('searchValue,title',searchValue,title)
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    setTimeout(()=>{
      Toast.clear();
    },1000)
  },
  search(index){
    // 搜索操作，搜索的时候会把模糊数组清空
    this.clearFuzzyArr()
    // 发起请求得到数据列表
    this.mockRequest()
  },
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
  RndNum(n){
    var rnd=[];
    for(var i=0;i<n;i++)
        rnd[i] = Math.floor(Math.random()*100);
    return rnd;
  },
  // 模糊收索结束--------------------------------------
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
  // 模拟触底请求
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
  bindplay(e) {
    let vid = e.currentTarget.id;
    console.log('触发了播放事件vid', vid, this.vid)
    console.log('this.videoContext',this.videoContext)
    if(this.vid !== vid && this.videoContext){
      console.log('暂停上一个视频播放')
      this.videoContext.stop();
    }
    this.vid = vid;
    this.videoContext = wx.createVideoContext(this.vid,this);
    var {
      index
    } = e.target.dataset
    const str = `videoList[${index}].show`
    this.setData({
      [str]: false
    })
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
  unfold(e) {
    const {
      index
    } = e.currentTarget.dataset
    const str = `videoList[${index}].isunfold`
    this.setData({
      [str]: !this.data.videoList[index].isunfold
    })
  },
  onLoad(options){
    const { identifier='' } = options
    if(!!identifier){
      // console.log('拿到了identifier',identifier)
      wx.setNavigationBarTitle({
        title: identifier
      })
      this.setData({
        title: identifier
      })
    }else{
      // console.log('没有拿到identifier',identifier)
    }
  }
})