// component/public-module/my_picker/my_picker.js
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
    showDialog:true,
    exportData:false,
  },
  ready() {},
  /**
   * 组件的方法列表
   */
  methods: {
    freetoBack(){
      this.triggerEvent('clickEvent', this.data.exportData)
    },
    goCreate(){
      this.triggerEvent('goCreate','')
    }
  }
})
