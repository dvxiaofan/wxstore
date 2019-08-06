/*
 * @Author: zhang 
 * @Date: 2019-08-06 13:20:51 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-06 15:32:40
 */



const db = wx.cloud.database({
  env: 'wxstore-devzhang'
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // product: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...'
    });

    // 查询云数据库内容
    db.collection('product').doc(options.id).get().then((result) => {
      wx.hideLoading();
      
      const product = result.data;

      if (product) {
        this.setData({
          product
        })
      }else {
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      }
    }).catch((err) => {
      wx.hideLoading();
      console.error(err);

      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    });

    // wx.cloud.callFunction({
    //   name: 'productDetail',
    //   data: {
    //     id: options.id
    //   }
    // }).then((result) => {
    //   wx.hideLoading();
      
    //   const data = result.result;
      
    //   console.log(data)

    //   if (data) {
    //     this.setData({
    //       product: data
    //     })
    //   } else {
    //     setTimeout(() => {
    //       wx.navigateBack();
    //     }, 2000);
    //   }
    // }).catch((err) => {
    //   console.error(err);
    //   wx.hideLoading();
      
    //   setTimeout(() => {
    //     wx.navigateBack();
    //   }, 2000);
    // });
      
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})