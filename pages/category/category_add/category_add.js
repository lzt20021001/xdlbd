/* 
1 点击 “+” 触发tap点击事件
  1 调用小程序内置的 选择图片的 api
  2 获取到 图片的路径  数组
  3 把图片路径 存到 data的变量中
  4 页面就可以根据 图片数组 进行循环显示 自定义组件
2 点击 自定义图片 组件
  1 获取被点击的元素的索引
  2 获取 data中的图片数组
  3 根据索引 数组中删除对应的元素
  4 把数组重新设置回data中
3 点击 “提交”
  1 获取文本域的内容 类似 输入框的获取
    1 data中定义变量 表示 输入框内容
    2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中 
  2 对这些内容 合法性验证
  3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
    1 遍历图片数组 
    2 挨个上传
    3 自己再维护图片数组 存放 图片上传后的外网的链接
  4 文本域 和 外网的图片的路径 一起提交到服务器 前端的模拟 不会发送请求到后台。。。 
  5 清空当前页面
  6 返回上一页 
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
    category: {},
    categoryName: "",
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
    categoryImage: "",
    token: "",
    upfile: ""
  },

  // 名称
  categoryNameChange(e) {
    if(e.detail.value===''){
      wx.showToast({
        title: '名称不能为空！',
        icon: 'error',
        duration: 2000

      });
      return;

    }else{
      this.setData({
        categoryName: e.detail.value
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
              categoryImage: data["data"]
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
      url: "/category/add",
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