// miniprogram/pages/home/home.js

const db = require('../../utils/db');
const util = require('../../utils/util');


Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList();
  },

  getProductList() {
    wx.showLoading({
      title: 'Loading...'
    });

    // 查询云数据库内容
    db.getProductList().then((result) => {
      wx.hideLoading();
      
      const productList = result.data;

      productList.forEach(product => {
        product.price = util.priceFormate(product.price);
      });

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch((err) => {
      wx.hideLoading();
      console.error(err);
    });
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