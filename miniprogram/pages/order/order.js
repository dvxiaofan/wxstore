/*
 * @Author: zhang 
 * @Date: 2019-08-07 13:52:05 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-09 10:57:40
 */

const db = require('../../utils/db');
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    util.getUserInfo().then( userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet')
    })

    this.getOrders();

    
  },

  // 登录
  onTapLogin(event) {
    if (event.detail.userInfo) {
      this.setData({
        userInfo: event.detail.userInfo
      })
    }
  },

  getOrders() {
    wx.showLoading({
      title: 'Loading...'
    });
      
    db.getOrders().then((result) => {
      wx.hideLoading();

      const data = result.result;

      if (data) {
        data.forEach(item => {
          item.productList.forEach(product => {
            product.price = util.priceFormate(product.price);
          })
        })
    
        this.setData({
          orderList: data
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