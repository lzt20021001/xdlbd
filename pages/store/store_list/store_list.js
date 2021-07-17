// pages/category/category_edit/category_edit.js
import {
  request
} from "../../../request/index.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({
  data: {
    storelist: [],
    token: '',
    search:'',
    storeName1:''
    },
 

     // 接口要的参数
  QueryParams:{
    storeName:"a",
    province:"",
    city:"",
    region:"",
    signStatus:"",
    page:1,
   // pagesize:10
  },
   // 总页数
   totalPages:1,
  
//goSearch
goSearch(){
   wx.navigateTo({
     url: '../store_list/storesearch',
   })

},

search(e){
  console.log("search----------");
  console.log(e);
  var s=e.detail.value||"";
  console.log("s===",s);
/*   var  that = this;
       if(!s=='')
       console.log("====",that.data.storeName1)
       {
        
          that.setData({
             storeName1:s
           })
  }
 */
  console.log('this.QueryParams=执行前',this.QueryParams);
  this.QueryParams.storeName=s;//this.data.storeName1;
  console.log('this.QueryParams=执行后',this.QueryParams);

 this.getStorelist(this.QueryParams);
 console.log('是否报错');

   
   console.log("------------search------");
},

  //
  async getStorelist(QueryParams) {
    console.log("-----getStorelist-----");
     let p =QueryParams.province||'';
     let c =QueryParams.city||'';
     let r =QueryParams.region||'';
  
     let eurl="/store/getPageList";
     if(!QueryParams.page=='')
    {
      eurl=eurl+"?page="+QueryParams.page;
    }else{
     eurl=eurl+"?page=1";
    };
    if(!QueryParams.signStatus=='')
    {
      eurl=eurl+"&signStatus="+QueryParams.signStatus;
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
   
    const res = await request({
      url: eurl,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': this.data.token
      },

    });

    if (res.code === 200) {
      console.log(res);
      this.setData({
        // 拼接了数组
        storelist: [...this.data.storelist, ...res.data.result]
      })
    } else {
      console.log(res);
      wx.showToast({
        title: '稍等请重试！',
        icon: 'error',
        duration: 2000

      });
    };
     // 获取 总条数
     const total=res.data.totalCount;
     console.log("total"+total);
     // 计算总页数
     this.totalPages=Math.ceil(total/10);
     console.log("totalPages"+this.totalPages);
     // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
     wx.stopPullDownRefresh();
     console.log("----get eurl-----");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("-----onLoad-----");
   // console.log(options);
    this.QueryParams.province=options.province||"";
    this.QueryParams.city=options.city||"";
    this.QueryParams.region=options.region||"";
    this.QueryParams.signStatus=options.signStatus||"";
   console.log(this.QueryParams);
   console.log("----onLoad QueryParams-----");

   let that = this;
    try {
      let res = wx.getStorageSync('user');
      console.log(res.token);
     if(res){
       that.setData({
           token:res.token
       });
   
     }      
    // 异步调用放在这里
    } catch (e) {
      console.log(e);
    }

    console.log(that.token);
    //同步放在这里
    this.getStorelist(this.QueryParams);
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

    // 页面上滑 滚动条触底事件
    onReachBottom(){
      console.log("onReachBottom--");
      //  1 判断还有没有下一页数据
        if(this.QueryParams.page>=this.totalPages){
          // 没有下一页数据
          //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
          wx.showToast({ title: '没有下一页数据' });
            
        }else{
          // 还有下一页数据
           // console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
          this.QueryParams.page++;
          console.log("this.QueryParams.page"+this.QueryParams.page);
          this.getStorelist(this.QueryParams);
        }
        console.log("--onReachBottom--");
      },
      // 下拉刷新事件 
      onPullDownRefresh(){
        // 1 重置数组
        this.setData({
          storelist:[]
        })
        // 2 重置页码
        this.QueryParams.page=1;
        // 3 发送请求
        this.getStorelist(this.QueryParams.page);
      },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})