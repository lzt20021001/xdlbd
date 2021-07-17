// pages/category/category_edit/category_edit.js
import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandlist: [],
    token: ''
    },
  

  //
  async getBrandlist() {
    this.setData({
      brandlist:[]
    })
    const res = await request({
      url: "/brand/allBrands",
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token
      }
    });

    if (res.code === 200) {
      console.log(res);
      this.setData({
        // 拼接了数组
        brandlist: [...this.data.brandlist, ...res.data]
      })
    } else {
      console.log(res);
      wx.showToast({
        title: '稍等请重试！',
        icon: 'error',
        duration: 2000

      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    try {
      let res = wx.getStorageSync('user');
     if(res){
      that.setData({       
        token:res.token
      })
     }      
    // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }
    //同步放在这里
    this.getBrandlist();
  },
    //del
    goDel(e){
      // console.log(e);  data: JSON.parse(JSON.stringify(id)),
      let that = this;
       let id =e.currentTarget.dataset;
       console.log(id);
       let eurl = 'http://81.68.254.238:8081/brand/delete'
        wx.request({
         url: eurl, 
         method:'POST',
         data: id,
         header: {
           'content-type': 'application/x-www-form-urlencoded',
            'Authorization': this.data.token
         },
         success (res) {
                
          that.getBrandlist();
         },
         fail(err)
         {
           console.log(err);
          return;
     
         }
       })
     
      },
     
      goEdit(e){
     
         let id =e.currentTarget.dataset;
         console.log(id); 
         // console.log(typeof(id));   object
         
         //let sid = JSON.stringify(id);
        // console.log(typeof(sid));   string
     
         let eurl= '../brand_edit/brand_edit?id='+id.id;
          wx.navigateTo({
           url: eurl
         }) 
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