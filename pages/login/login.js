// pages/login/login.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    password: "",
    token: ""
  },

  clearuser(){
    
  },

  getuser(e) {
    let userName = e.detail.value;
    this.setData({
      userName
    })

  },
  getpass(e) {
    let password = e.detail.value;
    this.setData({
      password
    })

  },

  login() {
    // console.log(this.data);
    const {
      userName,
      password
    } = this.data;

    if (!userName || !password) {
      wx.showModal({
        title: '温馨提示',
        content: '亲爱的商务同学，账号密码不能为空哦 ~',
      });
      return;
    } else {
      this.getLonininfo();

    }

  },

  //获取登录信息
  async getLonininfo() {

    const res = await request({
      url: "/sso/login",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: JSON.parse(JSON.stringify(this.data))
    });
    // console.log(res);
    if (res.code === 200) {
      try {

        wx.setStorageSync('user', res.data)
       /*  wx.setStorage(
          key: "user",
          data: res.data
        }) */
      } catch (e) {
        console.log(e);
      }
      wx.navigateTo({
        url: '../index/index',
      })
    } else {
      wx.showToast({
        title: '账号或密码错误，请重试！',
        icon: 'error',
        duration: 2000

      });
    }



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