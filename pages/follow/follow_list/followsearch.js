// pages/store/store_list/storesearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    region: '',
    followUpStatus:'',
    belongToId:'',
    followUpType: ''



  },
//跟进状态
  followStatusChange(e) {

    this.setData({
      followUpStatus: e.detail.value

    })
  },
  //BD归属
  belongChange(e) {

    this.setData({
      belongToId: e.detail.value

    })
  },

  //跟进方式
  followTypeChange(e) {

    this.setData({
      followUpType: e.detail.value

    })
  },




  bindRegionChange(e) {
    console.log("region---");
    var item = e.detail.value;
    console.log(item);
    this.setData({
      province: item[0],
      city: item[1],
      region: item[2]
    })
    console.log(this.data.province);
    console.log("----region---");
  },

  resetform()
  {
     this.setData({
        province:'',
        city:'',
        region:'',
        followUpStatus:'',
        belongToId:'',
        followUpType: ''
     });
  },

  submitform(e) {
    console.log("---search ----");
    console.log(e);
    let s = e.detail.value.followUpStatus || "";
    let b = e.detail.value.belongToId || "";
    let f = e.detail.value.followUpType || "";
    let p = this.data.province || "";
    console.log(p);
    let c = this.data.city || "";
    console.log(c);
    let r = this.data.region|| "";
    console.log(r);
    let eurl = '../follow_list/follow_list?page=1';
    if (!s == '') {
      eurl = eurl + "&followUpStatus=" + s;

    };
    if (!b == '') {
      eurl = eurl + "&belongToId=" + b;

    };
    if (!f == '') {
      eurl = eurl + "&followUpType=" + f;

    };
    if (!p == '') {
      eurl = eurl + "&province=" + p;
      if (!c == '') {
        eurl = eurl + "&city=" + c;
        if (!r == '') {
          eurl = eurl + "&region=" + r;
        }
      };
    };

    console.log(eurl);
    console.log("---search  eur----");
    wx.navigateTo({
      url: eurl
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

  
})