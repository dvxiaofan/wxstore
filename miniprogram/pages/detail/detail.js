/*
 * @Author: zhang 
 * @Date: 2019-08-06 13:20:51 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-09 14:59:04
 */



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
    this.getProductDetail(options.id);
  },

  // 获取商品详情
  getProductDetail(id) {
    wx.showLoading({
      title: 'Loading...'
    });

    // 查询云数据库内容
    db.getProductDetail(id).then((result) => {
      wx.hideLoading();
      
      const product = result.result;

      if (product) {
        product.price = util.priceFormate(product.price);
        
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
  },

   // 添加购物车
  addToCart() {
    wx.showLoading({
      title: 'Add to cart...'
    });

    db.addToCart(this.data.product).then((result) => {
      wx.hideLoading();

      const data = result.result;

      if (data) {
        wx.showToast({
          title: 'Succeed',
          icon: 'none'
        })
      }
    }).catch((err) => {
      console.error(err);
      wx.hideLoading();

      wx.showToast({
        title: 'Failed',
        icon: 'none'
      })      
    });
  },

  // 购买商品
  buy() {
    wx.showLoading({
      title: 'Purchasing...'
    });
      
    const productToBuy = Object.assign({
      count: 1
    }, this.data.product);

    productToBuy.productId = productToBuy._id;

    db.addToOrder({
      list: [productToBuy]
    }).then((result) => {
      wx.hideLoading();

      const data = result.result;

      if (data) {
        wx.showToast({
          title: 'Succeed',
          icon: 'none'
        })
      }
    }).catch((err) => {
      console.error(err);
      wx.hideLoading();

      wx.showToast({
        title: 'Failed',
        icon: 'none'
      })      
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