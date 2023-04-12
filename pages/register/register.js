// pages/protocol/protocol_name.js
import {
  testFormat,
  stringTestMsg,
  phoneFormat,
  roleFormat,
  pictureFormat,
  beSpaces,
  selectFormat
} from '../../utils/util.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    fuzzyResultArr: [],
    userInfo: {}, // 微信授权信息
    company: {
      value: '',
      isOk: false, // 公司名称是否合格
      errMsg: ""
    },
    variety: {
      value: '',
      isOk: false, // 代理品种是否合格
      errMsg: ""
    },
    phone: {
      value: '',
      isOk: false, // 电话是否合格
      errMsg: ""
    },
    address: {
      value: '',
      isOk: false, // 地址是否合格
      errMsg: ""
    },
    fileList: [],
    fileList2: [],
    value1: -1, //一级角色
    value2: -1, //二级角色
    value3: -1, //供应链子集角色
    role1: '请选择一级角色', //一级角色的标题
    role2: '请选择二级角色', //二级角色的标题
    role3: '请选择供应链子级', //二级角色的标题
    option1: [{
        text: '供应链',
        value: 0
      },
      {
        text: '种子公司',
        value: 1
      },
      {
        text: '苗场',
        value: 2
      },
      {
        text: '代办',
        value: 3
      }
    ],
    option2: [{
        text: '角色一',
        value: 0
      },
      {
        text: '角色二',
        value: 1
      },
      {
        text: '角色三',
        value: 2
      },
    ],
    option3: [{
        text: '子级一',
        value: 0
      },
      {
        text: '子级二',
        value: 1
      },
      {
        text: '子级三',
        value: 2
      },
    ],
  },
  timeID: 1,
  changeRole({
    detail
  }) {
    this.setData({
      role1: this.data.option1[detail].text
    });
  },
  changeRole2({
    detail
  }) {
    this.setData({
      role2: this.data.option2[detail].text
    });
  },
  clickPreview() {
    console.log('触发了clickPreview方法')
  },

  delete(event) {
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
  delete2(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList2 = this.data[`fileList${name}`];
    fileList2.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList2
    });
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    const {
      fileList = []
    } = this.data;
    fileList.push({
      ...file
    });
    this.setData({
      fileList
    });
    console.log('file',file)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     console.log('上传到服务器成功啦',res)
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    //   fail(err){
    //     console.log('上传到服务器失败啦',err)
    //   }
    // });
  },
  afterRead2(event) {
    const {
      file
    } = event.detail;
    console.log('file', file)
    const {
      fileList2 = []
    } = this.data;
    fileList2.push({
      ...file
    });
    this.setData({
      fileList2
    });
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     console.log('上传到服务器成功啦', res)
    //     // 上传完成需要更新 fileList
    //     const {
    //       fileList = []
    //     } = this.data;
    //     fileList.push({
    //       ...file,
    //       url: res.data
    //     });
    //     this.setData({
    //       fileList
    //     });
    //   },
    //   fail(err) {
    //     console.log('上传到服务器失败啦', err)
    //   }
    // });
  },
  // 电话
  phoneBlur(e) {
    var phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (phone.test(e.detail.value)) {
      this.setData({
        phone: {
          ...this.data.phone,
          errMsg: '',
          value: e.detail.value,
          isOk: true
        }
      })
    } else {
      this.setData({
        phone: {
          ...this.data.phone,
          errMsg: '电话号码格式错误',
          value: e.detail.value,
          isOk: false
        }
      })
    }
  },
  // 代理品种
  // varietyBlur(e) {
  //   var errMsg = stringTestMsg(e.detail.value, '代理品种')
  //   this.setData({
  //     variety: {
  //       ...this.data.variety,
  //       errMsg,
  //       value: e.detail.value
  //     }
  //   })
  // },
  // 公司名称
  companyInput(e) {
    clearTimeout(this.timeID)
    this.timeID = setTimeout(() => {
      var errMsg = stringTestMsg(e.detail, '公司名称')
      const {
        detail: value
      } = e
      console.log('e.detail', value)
      this.setData({
        company: {
          ...this.data.company,
          errMsg,
          value
        }
      })
      if (!value) { //没有了value值则清空模糊查找的数组
        this.setData({
          fuzzyResultArr: []
        })
        return;
      }
      if (value && !beSpaces(value)) {
        console.log('value值不为假', value)
        // 发起请求获取模糊数组
        clearTimeout(this.timeID)
        this.timeID = setTimeout(() => {
          console.log('防抖成功')
          this.setData({
            fuzzyResultArr: this.RndNum(5)
          })
        }, 300)
      }
    }, 100)
  },
  clearFuzzyArr() {
    this.setData({
      fuzzyResultArr: []
    })
  },
  fuzzyResultSearch(e) {
    const {
      value
    } = e.currentTarget.dataset
    console.log(e)
    this.setData({
      company: {
        ...this.data.company,
        value
      },
      fuzzyResultArr: []
    })
  },
  RndNum(n) {
    var rnd = [];
    for (var i = 0; i < n; i++)
      rnd[i] = Math.floor(Math.random() * 100);
    return rnd;
  },
  // 地址
  addressBlur(e) {
    var errMsg = stringTestMsg(e.detail.value, '地址')
    this.setData({
      address: {
        ...this.data.address,
        errMsg,
        value: e.detail.value
      }
    })
  },
  varietyChange({
    detail
  }) { // 解决失去焦点才修改值点击注册两次才能生效bug
    console.log('varietyChange')
    this.setData({
      variety: {
        ...this.data.variety,
        value: detail
      }
    })
  },
  phoneChange({
    detail
  }) { // 解决失去焦点才修改值点击注册两次才能生效bug
    this.setData({
      phone: {
        ...this.data.phone,
        value: detail
      }
    })
  },
  addressChange({
    detail
  }) { // 解决失去焦点才修改值点击注册两次才能生效bug
    this.setData({
      address: {
        ...this.data.address,
        value: detail
      }
    })
  },
  supplyChain({
    detail
  }) {
    this.setData({
      role3: this.data.option3[detail].text
    });
  },
  register() {
    const {
      company,
      variety,
      phone,
      address,
      value1,
      value2,
      value3,
      fileList,
      fileList2
    } = this.data
    if (this.data.value1 !== 3 && this.data.value1 !== 0) {
      // console.log('没有选中代办')
      if (roleFormat(value1, '一级') && roleFormat(value2, '二级') && phoneFormat(phone.value, '电话') && testFormat(this.data.address.value, '地址')  && testFormat(company.value, '公司名称')&& pictureFormat(fileList, '公司logo') && pictureFormat(fileList2, '营业执照')) {
        Toast.success('数据校验全部过关');
        console.log('company', this.data.company)
        console.log('value1', this.data.option1[this.data.value1].text)
        console.log('value2', this.data.option2[this.data.value2].text)
        console.log('variety', this.data.variety)
        console.log('phone', this.data.phone)
        console.log('address', this.data.address)
        console.log('fileList', this.data.fileList)
        console.log('fileList2', this.data.fileList2)
        // 判断是否注册，如果没有注册就可以注册，已经注册就提醒手机号已经注册，
        // 不允许注册的话就是已经注册了，判断是否有支付没有支付跳转到支付页面，已经支付则判断是否有审批通过，没有审批通过跳转到稍等审批页面，审批通过则跳转到首页
        // 允许注册发起注册请求，并且在请求接口调用成功之后跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/pay'
        })
      }
    } else if (this.data.value1 === 0) {
      // 选中了供应链
      if (roleFormat(value1, '一级')&&selectFormat(value3,'供应链子级')&& roleFormat(value2, '二级') && phoneFormat(phone.value, '电话') && testFormat(this.data.address.value, '地址')   && testFormat(company.value, '公司名称')&& pictureFormat(fileList, '公司logo') && pictureFormat(fileList2, '营业执照')) {
        Toast.success('数据校验全部过关');
        wx.navigateTo({
          url: '/pages/pay/pay'
        })
      }
    } else {
      // console.log('选中代办了')
      if (roleFormat(value1, '一级') && roleFormat(value2, '二级') && phoneFormat(phone.value, '电话') && testFormat(this.data.address.value, '地址')) {
        Toast.success('数据校验全部过关');
        console.log('value1', this.data.option1[this.data.value1].text)
        console.log('value2', this.data.option2[this.data.value2].text)
        console.log('variety', this.data.variety)
        console.log('phone', this.data.phone)
        console.log('address', this.data.address)
        // 判断是否注册，如果没有注册就可以注册，已经注册就提醒手机号已经注册，
        // 不允许注册的话就是已经注册了，判断是否有支付没有支付跳转到支付页面，已经支付则判断是否有审批通过，没有审批通过跳转到稍等审批页面，审批通过则跳转到首页

        // 允许注册发起注册请求，并且在请求接口调用成功之后跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/pay'
        })
      }
    }
  },
  VisitorEntry  () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  onLoad: function (options) {
    // console.log()
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    // wx.getSetting({
    //   success(res) {
    //     console.log('res.authSetting',res.authSetting)
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success () {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {},

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
