/* 

 */
import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: "基本信息",
        isActive: true
      },
      {
        id: 1,
        name: "联系人",
        isActive: false
      },
      {
        id: 2,
        name: "跟进记录",
        isActive: false
      }

    ],

   // storeId: '',
    id: '',
    storeName: '',
    services:'',
    contactsName: '',
    contactsPhone: '',
    status: '',
    signStatus: '',
    mchId: '',
    province: '',
    city: '',
    region: '',
    detailAddress: '',
    belongToId: '',
    businessLicense: '',
    storeHeadPhoto: '',
    images: [],
    openStartTime:'',
    openEndTime:'',
    linklist: [],
    followlist: []



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {

  },

  onLoad(options) {
    console.log(options);
    let that = this;
    try {
      let res = wx.getStorageSync('user');
      if (res) {
        that.setData({
          token: res.token,
          id: options

        })
      }
      // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }
    //同步放在这里

    this.getStoreDetail(options);
    this.getlinklist(options);
    this.getfollowlist(options);


  },

  //
  async getStoreDetail(id) {
    const storeObj = await request({
      url: "/store/getOne",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': this.data.token
      },
      data: JSON.parse(JSON.stringify(id))
    });

    let storeinfo = storeObj.data;
    console.log(storeinfo);

    this.setData({
      mchId:storeinfo.mchId,
      id: storeinfo.id,
      storeName: storeinfo.storeName,
      status: storeinfo.status,
      contactsName: storeinfo.contactsName,
      contactsPhone: storeinfo.contactsPhone,
      status: storeinfo.status,
      signStatus: storeinfo.signStatus,
      province: storeinfo.province,
      city: storeinfo.city,
      region: storeinfo.region,
      detailAddress: storeinfo.detailAddress,
      belongToId: storeinfo.belongToId,
      businessLicense: storeinfo.businessLicense,
      storeHeadPhoto: storeinfo.storeHeadPhoto,
      images: storeinfo.images

    })
  },


  //
  async getlinklist(options) {
    // console.log(options);
    let that = this;
    /*     let pageIndex=1;
        let pageIndex=1;
        let pageSize=10; */
    let storeId = options.id;
    let eurl = "/storeCustomer/getPageList?storeId=" + storeId + "&pageSize=2";

    const res = await request({

      url: eurl,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token,
      },

    });

    if (res.code === 200) {
      console.log(res);
      that.setData({
        // 拼接了数组
        linklist: [...this.data.linklist, ...res.data.result]

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

//getfollowlist
async getfollowlist(options) {
  // console.log(options);
  let that = this;
  /*     let pageIndex=1;
      let pageIndex=1;
      let pageSize=10; */
  let storeId = options.id;
  let eurl = "/storeFollowUpRecord/getPageList?storeId=" + storeId;

  const res = await request({

    url: eurl,
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Authorization': this.data.token,
    },

  });

  if (res.code === 200) {
    console.log(res);
    that.setData({
      // 拼接了数组
      followlist: [...this.data.followlist, ...res.data.result]

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


  goEdit: function (e) {

    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../store_edit/store_edit?id=' + id,
    })
  },

  goCancel: function (e) {

    let id = e.currentTarget.dataset;
    console.log(id);
    console.log(typeof (id));
    //console.log(id.id);
    this.logicDel(id);

    /*  wx.showModal({
       cancelColor: 'cancelColor',
     }) */
  },

  async logicDel(id) {
    const res = await request({

      url: "/store/cancel",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': this.data.token,
      },
      data: id

    });
    if (res.code === 200) {
      console.log(res);
      wx.navigateTo({
        url: '../store_list/store_list',
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



  //preHeadView
  preHeadView(e) {

    let purl = [];
    purl[0] = this.data.storeHeadPhoto
    wx.previewImage({
      current: this.data.storeHeadPhoto, // 当前显示图片的http链接  
      urls: purl
    })

  },
  //preStrView
  preStrView(e) {
    // console.log(e)
    let purl = this.data.images;
    let arrUrl=[];

    for (let i = 0; i < purl.length; i++) {
      let obj = purl[i];
      arrUrl[i]=obj.storeImage;
     }
    //console.log(arrUrl);
    wx.previewImage({
      current: arrUrl[0],
      urls: arrUrl
    })



  },


  //
  preLicView(e) {

    let purl = [];
    purl[0] = this.data.businessLicense
    wx.previewImage({
      current: this.data.businessLicense, // 当前显示图片的http链接  
      urls: purl
    })

  },

  golinkNew(e) {
    console.log(e);
    let id = e.currentTarget.dataset;
    console.log(id);
    console.log(id.storeinfo);
    let str=id.storeinfo.split(",");
    console.log(str);
    let eurl = "../../storeCust/storecust_add/storecust_add?StoreId="+str[0]+"&storeName="+str[1];
    console.log(eurl);
    wx.navigateTo({
      url: eurl
    })

  },
  golinkEdit(e) {
    console.log("--------golinkEdit");
    console.log(e);
    let id = e.currentTarget.dataset;
    console.log(id);
    console.log(id.id);
    //let str=id.linkinfo.split(",");
   // console.log(str);
    let eurl = "../../storeCust/storecust_edit/storecust_edit?id="+id.id //str[0]+"&storeId="+str[1]+"&storeName="+str[2];
    //let eurl = "../../storeCust/storecust_edit/storecust_edit?id="+str[0]+"&storeName="+str[1];
    console.log(eurl);
    wx.navigateTo({
      url: eurl
    });
    console.log("golinkEdit--------");
    
  },
  golinkDel: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset)
    /*  wx.showModal({
       cancelColor: 'cancelColor',
     }) */
  },

  //gofollowNew
  gofollowNew(e) {
    console.log(e);
    let id = e.currentTarget.dataset;
    console.log(id);
    console.log(id.storeinfo);
    let str=id.storeinfo.split(",");
    console.log(str);
    let eurl = "../../follow/follow_add/follow_add?StoreId="+str[0]+"&storeName="+str[1];
    console.log(eurl);
    wx.navigateTo({
      url: eurl
    })

  },
  gofollowEdit(e) {
    console.log("--------golinkEdit");
    console.log(e);
    let id = e.currentTarget.dataset;
    console.log(id);
    console.log(id.id);
    //let str=id.linkinfo.split(",");
   // console.log(str);
    //let eurl = "../../storeCust/storecust_edit/storecust_edit?id="+id.id //str[0]+"&storeId="+str[1]+"&storeName="+str[2];
    let eurl = "../../follow/follow_edit/follow_edit?id="+id.id //str[0]+"&storeId="+str[1]+"&storeName="+str[2];
    //let eurl = "../../storeCust/storecust_edit/storecust_edit?id="+str[0]+"&storeName="+str[1];
    console.log(eurl);
    wx.navigateTo({
      url: eurl
    });
    console.log("gofollowEdit--------");
    
  },
  gofollwDel: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset)
    /*  wx.showModal({
       cancelColor: 'cancelColor',
     }) */
  },





  /*   async linkDel(  ){

      const linkdel = await request({
        url: "/storeCustomer/delete",
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Authorization': this.data.token
        },
        data: JSON.parse(JSON.stringify(id))
      });

      if (res.code === 200) {
        //console.log(res);
        that.setData({
          // 拼接了数组
          linklist:[...this.data.linklist, ...res.data.result]
         
        })
       
      } else {
        console.log(res);
        wx.showToast({
          title: '稍等请重试！',
          icon: 'error',
          duration: 2000

        });
      }

    }, */

  // 自定义事件 用来接收子组件传递的数据的
  handleItemChange: function (e) {
    // 接收传递过来的参数
    console.log(e);
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    console.log(tabs);
    this.setData({
      tabs
    })

  },






})