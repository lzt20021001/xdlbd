
Page({
  data: {
     user:{},
     token:''
  }, 

 
  onLoad() {
    let that = this;
    try {
      let res = wx.getStorageSync('user');
      //console.log(res);
     if(res){
      that.setData({       
        user:res,
        token:res.token
      });
      //console.log(this.data.token);
     }else{
      console.log("else");
     }      
    
    } catch (e) {
      console.log(e);
    }
   
  },

  goAddStore(){
    wx.navigateTo({
      url: '../store/store_add/store_add',
    })
  },
  goStorelist(){
    wx.navigateTo({
      url: '../store/store_list/store_list',
    })
  },

  goAddCate(){
    wx.navigateTo({
      url: '../category/category_add/category_add',
    })
  },
  goCatelist(){
    wx.navigateTo({
      url: '../category/category_list/category_list',
    })
  },
  goAddbrand(){
    wx.navigateTo({
      url: '../brand/brand_add/brand_add',
    })
  },
  goBrandlist(){
    wx.navigateTo({
      url: '../brand/brand_list/brand_list',
    })
  },
  gofollowlist(){
    wx.navigateTo({
      url: '../follow/follow_list/follow_list',
    })
  }


})
