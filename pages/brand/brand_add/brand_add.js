
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
    items: [{
        name: '1',
        value: '是'
      },
      {
        name: '0',
        value: '否'
      },

    ],
    status: '',
    id: "",
    sortOrder: "",
    createTime: "",
    updateTime: "",
    brandImage: "",
    token: "",
    upfile: ""
  },

  // 名称
  brandNameChange(e) {
    if(e.detail.value===''){
      wx.showToast({
        title: '名称不能为空！',
        icon: 'error',
        duration: 2000

      });
      return;

    }else{
      this.setData({
        brandName: e.detail.value
      })
    }
   

  },

  //序号
  sortOrderChange(e) {
    if(e.detail.value===''){
      wx.showToast({
        title: '序号不能为空！',
        icon: 'error',
        duration: 2000

      });
      return;
    }else{
    this.setData({
      sortOrder: e.detail.value
    })
  }
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
              brandImage: data["data"]
            })
          }
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

  //取消
  resetform() {
    wx.navigateBack({
      delta: 0
    })
  },


  //提交 
  async submitform(e) {


    console.log(this.token);

    const res = await request({
      url: "/brand/add",
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
      wx.showToast({
        title: '成功！',
        icon: 'success',
        duration: 2000

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

  }

})