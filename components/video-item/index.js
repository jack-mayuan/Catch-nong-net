// components/video-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // videoList: [{
    //   uid: 1,
    //   title: "黄瓜技术培训视频",
    //   cover: "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1994212087.png",
    //   resource: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    //   show: true,
    //   company: "寿光汇坤商贸有限公司",
    //   time: "0000-00-00",
    //   isunfold: false // 是否展开,指的是文字
    // }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindplay(e) {
      let vid = e.currentTarget.id
      console.log('触发子组件的bindplay',vid)
      const {index} = this.data
      this.triggerEvent("bindplay",{vid,index,that:this})
    },
    pause(e) {
      var {
        index
      } = this.data
      this.triggerEvent('pause', {index})
    },
    unfold(e) {
      const {
        index
      } = this.data
      this.triggerEvent('unfold',{index})
    },
  }
})
