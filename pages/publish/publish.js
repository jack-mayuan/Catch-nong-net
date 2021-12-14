// pages/publish/publish.js
import {
  isEmpty,
  selectFormat,
  pictureFormat
} from '../../utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '', // 页面跳转过来的是图片还是视频的发布video，表示视频发布
    titleValue: '', //标题值
    roleOption: [{
        text: '抗性1',
        value: 0
      },
      {
        text: '抗性2',
        value: 1
      },
      {
        text: '抗性3',
        value: 2
      }
    ], //角色的可选值
    roleValue: '所属抗性', //角色的值
    roleIndex: -1,
    typeValue: '所属类型', //类型的值
    typeIndex: -1,
    typeOption: [{
        text: '品种展示',
        value: 0
      },
      {
        text: '现场会',
        value: 1
      }, {
        text: '供需',
        value: 2
      },
      {
        text: '实验示范',
        value: 3
      },
      {
        text: '品种登记',
        value: 4
      },
      {
        text: '供应链',
        value: 5
      }
    ], //类型的可选值
    textareaValue: '', //输入框内容

    fileList: [], // 视频上传的-视频列表

    fileList2: [], //上传图片的-图片列表
    fileList3: [], //上传视频封面
    fileList4: [], //上传图片封面
  },
  // 所属分类
  changeRole(e) {
    this.setData({
      roleValue: this.data.roleOption[e.detail].text,
      roleIndex: e.detail
    })
  },
  // 所属分类
  changeType(e) {
    this.setData({
      typeValue: this.data.typeOption[e.detail].text,
      typeIndex: e.detail
    })
  },
  // 
  // 点击发布按钮-发布图片
  clickpublicPic() {
    const {
      titleValue,
      typeValue,
      roleValue,
      typeIndex,
      roleIndex,
      textareaValue,
      fileList2,
      fileList4
    } = this.data
    console.log('发布标题', titleValue)
    console.log('所属类型', typeIndex, typeValue)
    console.log('所属抗性', roleIndex, roleValue)
    console.log('文本框的内容', textareaValue)
    console.log('视频上传框的内容', fileList2)
    console.log('视频封面图片', fileList4)
    if (isEmpty(titleValue, '标题') && selectFormat(roleIndex, '抗性') && selectFormat(typeIndex, '类型') && isEmpty(textareaValue, '内容') && pictureFormat(fileList2, '图片') && pictureFormat(fileList4, '图片封面')) {
      Toast('全部都上传完成允许提交')
    }
  },
  // 点击发布按钮-发布视频
  clickpublicVideo() {
    const {
      titleValue,
      typeValue,
      roleValue,
      typeIndex,
      roleIndex,
      textareaValue,
      fileList,
      fileList3
    } = this.data
    console.log('发布标题', titleValue)
    console.log('所属类型', typeIndex, typeValue)
    console.log('所属角色', roleIndex, roleValue)
    console.log('文本框的内容', textareaValue)
    console.log('视频上传框的内容', fileList)
    console.log('视频封面图片', fileList3)
    if (isEmpty(titleValue, '标题') && selectFormat(roleIndex, '角色') && selectFormat(typeIndex, '类型') && isEmpty(textareaValue, '内容') && pictureFormat(fileList, '视频') && pictureFormat(fileList3, '视频封面')) {
      Toast('全部都上传完成允许提交')
    }
  },
  // 上传视频之后触发的事件
  afterRead(event) {
    const {
      file
    } = event.detail;
    var _this = this
    console.log('触发了afterRead>file', file)
    const {
      fileList = []
    } = this.data;
    fileList.push({
      ...file
    });
    this.setData({
      fileList
    });
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    //   fail(err){
    //     Toast.fail(err.errMsg);
    //   }
    // });
  },
  // 上传图片之后触发的事件
  afterRead2(event) {
    var _this = this
    const {
      file
    } = event.detail;
    const {
      fileList2 = []
    } = this.data;
    fileList2.push({
      ...file
    });
    this.setData({
      fileList2
    });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    //   fail(err){
    //     // console.log(err)
    //     Toast.fail(err.errMsg);
    //   }
    // });
  },
  // 上传图片封面之后发的事件
  afterRead3(event) {
    const {
      file
    } = event.detail;
    console.log(file)
    const {
      fileList3 = []
    } = this.data;
    fileList3.push({
      ...file
    });
    this.setData({
      fileList3
    });
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  afterRead4(event) {
    const {
      file
    } = event.detail;
    console.log(file)
    const {
      fileList4 = []
    } = this.data;
    fileList4.push({
      ...file
    });
    this.setData({
      fileList4
    });
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  // 上传图片的删除事件
  delete(event) {
    const {
      index,
      name
    } = event.detail;
    console.log('index name', index, name)
    const fileList = this.data[`fileList`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList`]: fileList
    });
  },
  // 上传照片的删除事件
  delete2(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },
  // 删除视频封面
  delete3(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },
  // 删除图片封面
  delete4(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      type
    } = options
    this.setData({
      type: type
    })
    if (type === "video") {
      wx.setNavigationBarTitle({
        title: '发布视频'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '发布图文'
      })
    }
  }
})