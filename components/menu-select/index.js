Component({
  properties: {
    value: {
      type: String,
      value: ''
    },
    option: {
      type: Array,
      value: []
    }
  },
  data: {
    isSelect: false, //是否选中所属角色
    currentIndex1: -1, //选中角色的下标
    // value: '所属角色',//角色的值
    // option: [{
    //   text: '全部商品',
    //   value: 0
    // },
    //   {
    //     text: '新款商品',
    //     value: 1
    //   },
    //   {
    //     text: '活动商品',
    //     value: 2
    //   }
    // ],
  },
  methods: {
    clickMask() {
      this.setData({
        isSelect: false
      })
    },
    selectRole() {
      this.setData({
        isSelect: !this.data.isSelect
      })
    },
    clickRoleItem(e){
      console.log('触发了子方法e',e)
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex1: index,
      })
      this.triggerEvent('change', index)
      setTimeout(()=>{
        this.setData({
          isSelect: !this.data.isSelect
        })
      },200)
    },
  }
})
