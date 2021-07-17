// pages/fileup/fileup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryImage: "",
    token: "2FC0D145E5E04B17B05BEE502680773A7DCDCF9BD910D19F337DF208A4A1572565C7DD6F0AAD86A6194214C3DD85C1979F5A49B20290F6DEBE1B45E712E31E4E",
    upfile: ""
  },

    //图片
    handleChooseImg() {
      let that = this;
      wx.chooseImage({
  
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (result) => {
          that.setData({
            categoryImage: result.tempFilePaths[0]
          })
          
          wx.uploadFile({
            url: 'http://81.68.254.238:8081/file/upload', //
            filePath: that.data.categoryImage,
            name: 'file',
            method: "POST",
            header: {
              'content-type': 'multipart/form-data',
              'Authorization': that.data.token
            },           
            success(res) {
             
              //let data = JSON.parse(JSON.stringify(res.data));
              //JSON.parse将json转换为object对象
              let data = JSON.parse(res.data);
                           
              //do something
              that.setData({
                upfile: data["data"]
              })
            }
          })
        }
      })
    },
  
    //删除图片
    handleRemoveImg() {
      this.setData({
        categoryImage: ""
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

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