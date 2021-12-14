// components/picture-item/index.js
import {
  isImageFile
} from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    fatherindex: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picList: [{
      isunfold: false, // 是否展开,指的是文字
      imageArray: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        },
        {
          url: 'https://img.yzcdn.cn/vant/tree.jpg'
        }
      ]
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    picunfold() {
      const {
        fatherindex
      } = this.data
      this.triggerEvent('picunfold', {fatherindex})
    },
    // 预览图片
    onPreviewImage(event) {
      var {
        index
      } = event.currentTarget.dataset;
      // imageArray必须要是http类型直接放到服务器上面的资源可以直接展示的
      var lists = this.data.item.imageArray;
      var item = lists[index];
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
  }
})