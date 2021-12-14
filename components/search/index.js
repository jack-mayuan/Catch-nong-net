// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchValue: {
      type: String,
      value: ''
    },
    fuzzyResultArr: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(){
      this.triggerEvent('search', {})
    },
    input(e){
      const { value } = e.detail
      this.triggerEvent('input', { value })
    },
    fuzzyResultSearch(e){
      this.triggerEvent('fuzzyResultSearch', { index:e.target.dataset.index  })
    },
    clearFuzzyArr(){
      this.triggerEvent('clearFuzzyArr')
    }
  }
})
