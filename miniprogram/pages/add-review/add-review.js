/*
 * @Author: zhang 
 * @Date: 2019-08-16 13:01:36 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-16 13:33:24
 */

const util = require('../../utils/util');
const db = require('../../utils/db');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    reviewContent: '',
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then((userInfo) => {
      this.setData({
        userInfo
      })

      this.setProduct(options);
    }).catch((err) => {
      console.log('Not Authenticated yet');
    });
    
  },

  setProduct(options) {
    let product = {
      productId: options.productId,
      name: options.name,
      image: options.image,
      price: options.price
    };

    this.setData({
      product
    })
  },

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  addReview(event) {
    let content = this.data.reviewContent;
    if (!content) return;

    wx.showLoading({
      title: 'Submiting...'
    });

    db.addReview({
      userName: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      productId: this.data.product.productId
    }).then(result => {
      wx.hideLoading();
      
      const data = result.result;

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    }).catch(err => {
      console.error(err);

      wx.hideLoading();

      wx.showToast({
        title: 'Failed',
        icon: 'none'
      })
    })
      
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