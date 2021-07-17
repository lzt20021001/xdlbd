import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
const {
  trim
} = require('../../../utils/util.js')
Page({
  data: {
    //店铺名称
    storeName: '',
    //联系人信息
    contactsName: '',
    contactsPhone: '',
    //
    mchId:'',
    id: '',
    //经纬度
    latitude: '23.10229',
    longitude: '113.3345211',

    //营业时间
    openEndTimeStr: '',
    openStartTimeStr: '',
    //地址
    province: '',
    city: '',
    region: '',
  
    detailAddress: '',
    customItem: '全部',
    //签约状态
    signStatus: '',
    items: [{
        name: '0',
        value: '已签约'
      },
      {
        name: '1',
        value: '跟进中'
      }
    ],
    // 门头照
    storeHeadPhoto: '',
    // 店面照
    storeImages: '',
    // 营业执照
    businessLicense: '',

    //服务内容
    services: [],
    seitems: [
      {
        name: 0,
        value: '新车'
      },
      {
        name: 1,
        value: '维修'
      },
      {
        name: 2,
        value: '配件'
      },
      {
        name: 3,
        value: '充电'
      },

    ],

    token: '',

  },

  // 名称
  storeNameChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '客户名称为空！',
        icon: 'error',
        duration: 2000

      });
      return;

    } else {
      this.setData({
        storeName: e.detail.value
      })
    }


  },
  //mchIdChange
  mchIdChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '客户名称为空！',
        icon: 'error',
        duration: 2000

      });
      return;

    } else {
      this.setData({
        mchId: e.detail.value
      })
    }

  },

  //联系人
  contactsNameChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '联系人为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    } else {
      this.setData({
        contactsName: e.detail.value
      })
    }
  },

  //联系电话
  contactsPhoneChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '联系电话为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    } else {
      this.setData({
        contactsPhone: e.detail.value
      })
    }
  },
  //detailAddressChange
  detailAddressChange(e) {
    if (e.detail.value === '') {
      wx.showToast({
        title: '详细地址为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    } else {
      this.setData({
        detailAddress: e.detail.value
      })
    }
  },

//区域选择
  bindRegionChange(e) {
   // console.log(e);
    var item = e.detail.value;
   // console.log('picker发送选择改变，携带值为', e.detail.value)  
   // pcrAddr: e.detail.value
    this.setData({
       province:item[0],
       city:item[1],
       region:item[2]
    })
    //console.log(this.data.province);
    //console.log(this.data.city);
   // console.log(this.data.region);
  },

  bindTimePreChange(e) {

    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      openStartTimeStr: e.detail.value
    })
  },
  bindTimeEndChange(e) {
   // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      openEndTimeStr: e.detail.value
    })
  },
  //servicesChange
  servicesChange(e) {
    //console.log(e.detail.value);
    let arr= e.detail.value;
   // console.log(arr);
    let str =arr.join(",");
    //console.log(str);

   // var item = e.detail.value;   '0,1'
    this.setData({
      services:str
    })
   
  },

  //状态
  statusChange(e) {
    this.setData({
      signStatus: e.detail.value
    });
    //console.log(this.data.status);
  },



  //门头图片
  handleChooseHeadImg() {
    let that = this;
    wx.chooseImage({

      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        wx.uploadFile({
          url: 'http://81.68.254.238:8081/file/upload', //
          filePath: result.tempFilePaths[0],
          name: 'file',
          method: "POST",
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': that.data.token
          },
          success(res) {

            let data = JSON.parse(res.data);

            that.setData({
              storeHeadPhoto: data["data"]
            })
          }
        })
      }
    })
  },

  //删除门头图片
  handleRemoveHeadImg() {
    this.setData({
      storeHeadPhoto: ''
    })
  },

   //店铺图片
   handleChooseStoImg() {
    let that = this;
    wx.chooseImage({

      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        wx.uploadFile({
          url: 'http://81.68.254.238:8081/file/upload', //
          filePath: result.tempFilePaths[0],
          name: 'file',
          method: "POST",
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': that.data.token
          },
          success(res) {

            let data = JSON.parse(res.data);

            that.setData({
              storeImages: data["data"]
            })
          }
        })
      }
    })
  },

  //删除店铺图片
  handleRemoveStoImg() {
    this.setData({
      storeImages: ''
    })
  },

   //营业执照图片
   handleChooseLiImg() {
    let that = this;
    wx.chooseImage({

      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        wx.uploadFile({
          url: 'http://81.68.254.238:8081/file/upload', //
          filePath: result.tempFilePaths[0],
          name: 'file',
          method: "POST",
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': that.data.token
          },
          success(res) {

            let data = JSON.parse(res.data);

            that.setData({
              businessLicense: data["data"]
            })
          }
        })
      }
    })
  },

  //删除营业执照图片
  handleRemoveLiImg() {
    this.setData({
      businessLicense: ''
    })
  },

  //提交 
  async submitform(e) {

    console.log(this.token);

    const res = await request({
      url: "/store/add",
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
        url: '../../index/index',
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

  onLoad() {
    let that = this;
    try {
      let res = wx.getStorageSync('user');
      if (res) {
        that.setData({
          token: res.token
        })
      }

    } catch (e) {
      console.log(e);
    }

  },
  resetform() {
    wx.navigateBack({
      delta: 0
    })
  },

})