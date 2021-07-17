/* 

 */

import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
const {
  trim
} = require('../../../utils/util.js')
Page({
  data: {
    // 文本域的内容
  
    brandName: "",
    items: [
      { name: '1', value: '是' },
      { name: '0', value: '否' },
     
    ],
    status:'',
    id:'',
    sortOrder: "",  
    brandImage: "",    
    token: ""
  },
 
  // 名称
  brandNameChange(e) {
    let that = this;
    that.setData({
      brandName: e.detail.value,

    })

  },

  //序号
  sortOrderChange(e) {
    this.setData({
    
        sortOrder: e.detail.value
      
    })
  },


  //状态
  statusChange(e) {
    this.setData({
     
        status: e.detail.value
      
    });
    //console.log(this.data.status);
  },

  //图片
  handleChooseImg() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          brandImage: result.tempFilePaths[0]
        })
      }
    })
  },

  //删除图片
  handleRemoveImg() {
    this.setData({
      brandImage: ""
    })
  },

  resetform() {
    wx.navigateBack({
      delta: 0
    })
  },

  //提交 
  async submitform(e) {

    const res = await request({
      url: "/brand/edit",
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token
      },
      data: JSON.parse(JSON.stringify(this.data))
    });

    if (res.code === 200) {
      // console.log("sucess");
      wx.navigateTo({
        url: '../brand_list/brand_list',
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

  onLoad(options) {
   
    let that = this;
    try {
      let res = wx.getStorageSync('user');
      if (res) {
        that.setData({
          token: res.token,

        })
      }
      // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }
    //同步放在这里

    this.getDetail(options);


  },

  //
  async getDetail(id) {
    const brandObj = await request({
      url: "/brand/getOne",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': this.data.token
      },
      data: JSON.parse(JSON.stringify(id))
    });
   
    let brandinfo = brandObj.data;
    
    this.setData({
      // category: {
      id: brandinfo.id,
      brandName: brandinfo.brandName,
      status: brandinfo.status,
      sortOrder: brandinfo.sortOrder,
      brandImage: brandinfo.brandImage,
 

      // }
    })
  },

})