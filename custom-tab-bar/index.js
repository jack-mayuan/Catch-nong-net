// components/custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [{
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "/pages/search/search",
        "text": "检索"
      },
      {
        "pagePath": "/pages/article/article",
        "text": "文章"
      },
      {
        "pagePath": "/pages/list/list",
        "text": "列表"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "我的"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      // this.setData({
      //   active: e.detail
      // })
      const url = this.data.list[e.detail].pagePath
      // wx.reLaunch
      wx.reLaunch({
        url,
        fail(event) {
          console.log("custom-tab-bar switchTab fail", event);
        },
        complete(event) {
        }
      })
    }
  }
})