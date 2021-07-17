// pages/storeCustomer/storecust_add/storecust_add.js
import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
const {
  formatTime, trim
} = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   *  
  
   */
  data: {
    token: '',
    customerId:8,
    storeId: '',
   // storeName: '',
    //
    followUpTime: '2021-06-29 20:00:00',
    followTime:'',
    followDate:'',
    id: '',
    linkTypeitems: ["面谈", "电话(微信)"],
    followUpType: '',
    linklist: '',
    linkman: '',

    followStatusitems: ["初防","跟进中","暂时搁置"],
    followUpStatus: '',
    followUpContent: '',

    storestatusitems:["正常营业","倒闭","装修中"],
    storeBusinessStatus:'',

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let op = options;

    //let arr=op.split(",");
    console.log("--------o");
    console.log(op);
    console.log(typeof (op));
    // console.log(JSON.parse(JSON.stringify(op)));
    console.log(op.StoreId);
    console.log(op.storeName);
    console.log("o--------");

    let that = this;
    try {
      let res = wx.getStorageSync('user');
      if (res) {
        that.setData({
          token: res.token,
          storeId: op.StoreId,
          storeName: op.storeName
        })
      }
      // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }
    //同步放在这里
    console.log(this.data.storeId);
    this.getlinklist(this.data.storeId);

  },

  async getlinklist(options) {
    console.log("------getlinklist------")
    console.log(options)
    let that = this;
    let storeId = options;
    let eurl = "/storeCustomer/getPageList?storeId=";
    if (!storeId == '') {
      eurl = eurl + storeId;
    } else {
      return "NULL";
    };

    const res = await request({
      url: eurl,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token
      },

    });

    if (res.code === 200) {
        // console.log(res);
        let res_link =res.data.result;
        console.log(res_link);
        let arrUrl = [];
  
        for (let i = 0; i < res_link.length; i++) {
         
          console.log(res_link[i].customerName);
           arrUrl[i]=res_link[i].customerName;
          // arrUrl.push(res_link[i].customName);
          
        }
        console.log(arrUrl);
  
        that.setData({
          // 拼接了数组
          linklist: [...this.data.linklist, ...arrUrl]
        })
    } else {
      console.log(res);
      wx.showToast({
        title: '稍等请重试！',
        icon: 'error',
        duration: 2000

      });
    };


  },
//followDateChange
followDateChange(e) {
  console.log(e);
  this.setData({
    followDate: e.detail.value
  });
}, 

  //formatTime(new Date())
  followTimeChange(e) {
    console.log(e);
    this.setData({
      followTime: e.detail.value
    });
  }, 

  // 沟通方式linktypeChange
  linktypeChange(e) {
    console.log(e);

    this.setData({
      followUpType: e.detail.value
    });

    console.log(this.data.followUpType);

  },

  //linkmanChange
  linkmanChange(e) {
    console.log(e);
    this.setData({
      linkman: e.detail.value
    });

  },

  //跟进状态
  followstatusChange(e) {
    console.log(e);
    this.setData({
      followUpStatus: e.detail.value
    });
    console.log(this.data.followUpStatus);
  },


  recordChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '跟进记录为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    } else {
      this.setData({
        followUpContent: e.detail.value
      });
    }
  },


  storeStatusChange(e) {
    console.log(e);
    console.log(e.detail.value);
    this.setData({
      storeBusinessStatus: e.detail.value
    });    
    console.log(this.data.storeBusinessStatus);
  },


  //取消
  resetform() {
    wx.navigateBack({
      delta: 0
    });
  },

  //提交 
  async submitform(e) {

    //console.log(this.token);
    const res = await request({
      url: "/storeFollowUpRecord/add",
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token
      },
      data: JSON.parse(JSON.stringify(this.data))
    });

    if (res.code === 200) {
      // console.log("sucess");

      wx.navigateBack({
        delta: 0
      });


    } else {
      console.log(res);
      wx.showToast({
        title: '稍等请重试！',
        icon: 'error',
        duration: 2000

      });


    }

  },



})