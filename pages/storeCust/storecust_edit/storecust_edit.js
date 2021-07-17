// pages/storeCustomer/storecust_add/storecust_add.js
import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
const {
  trim
} = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    storeId:'',
    storeName:'',
    customerName:'',
    customerPhone:'',
    id:'',
    kpitems: [{
      name: '1',
      value: '是'
    },
    {
      name: '0',
      value: '否'
    },
  ],
    isKp:'',
    job:'',
    permission:'',
    sexitems: [{
      name: '1',
      value: '男'
    },
    {
      name: '0',
      value: '女'
    },
  ],
    sex:'',
    wechatCode:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let op=options; 
  
    console.log("--------o");
    console.log(op);
    console.log(typeof(op));
  
    console.log(op.id);
    //console.log(op.storeId);
   // console.log(op.storeName);
    console.log("o--------");

    let that = this;
    try {
      let res = wx.getStorageSync('user');
      if (res) {
        that.setData({
          token: res.token,
          id:op
         // id:op.id,
          //storeId:op.storeId,
          //storeName:op.storeName
        })
      }
      // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }
    //同步放在这里
    //console.log(this.data.id);
    //this.getDetail(this.data.id);
    this.getDetail(op);

  },

  async getDetail(id){
    console.log(id);
    //let lid = "id:"+id;
    const linkObj = await request({
      url: "/storeCustomer/getOne",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': this.data.token
      },
      data: id
    });
   
    let linkinfo = linkObj.data;
    console.log(linkinfo);
    this.setData({
    storeId:linkinfo.storeId,
    customerName:linkinfo.customerName,
    customerPhone:linkinfo.customerPhone,
    id:linkinfo.id,
    isKp:linkinfo.isKp,
    job:linkinfo.job,
    permission:linkinfo.permission,
    sex:linkinfo.sex,
    wechatCode:linkinfo.wechatCode
    })
  },

  
  // 名称
  customerNameChange(e) {
    if(e.detail.value===''){
      wx.showToast({
        title: '姓名为空！',
        icon: 'error',
        duration: 2000

      });
      return;

    }else{
      this.setData({
        customerName: e.detail.value
      });
    }
   

  },

  //联系方式
  customerPhoneChange(e) {
    if(e.detail.value===''){
      wx.showToast({
        title: '联系方式不能为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    }else{
    this.setData({
      customerPhone: e.detail.value
    });
  }
  },

  //性别
  sexChange(e) {
    this.setData({
      sex: e.detail.value
    });
    //console.log(this.data.status);
  },
//微信号
  wechatCodeChange(e){
    if(e.detail.value===''){
      wx.showToast({
        title: '微信号为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    }else{
    this.setData({
      wechatCode: e.detail.value
    });
  }
},

jobChange(e){
  if(e.detail.value===''){
    wx.showToast({
      title: '职务不能为空！',
      icon: 'error',
      duration: 2000

    });
    return;
  }else{
  this.setData({
    job: e.detail.value
  });
}
},

permissionChange(e){
  if(e.detail.value===''){
    wx.showToast({
      title: '管理权限为空！',
      icon: 'error',
      duration: 2000

    });
    return;
  }else{
  this.setData({
    permission: e.detail.value
  });
}
},

kpChange(e){
  this.setData({
    isKp: e.detail.value
  });
},


  //取消
  resetform() {
    wx.navigateBack({
      delta: 0
    });
  },

  //提交 
  async submitform() {

    //console.log(this.token);
    const res = await request({
      url: "/storeCustomer/edit",
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