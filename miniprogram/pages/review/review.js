/*
 * @Author: DevZhang 
 * @Date: 2019-08-17 22:01:30 
 * @Last Modified by: DevZhang
 * @Last Modified time: 2019-08-19 22:36:43
 */


const util = require('../../utils/util');
const db = require('../../utils/db');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    reviewList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setProduct(options);

    this.getReviews(options.productId);
  },

  // 设置商品
  setProduct(options) {
    let product = {
      productId: options.productId,
      name: options.name,
      image: options.image,
      price: options.price
    }

    this.setData({
      product
    })
  },

  // 获取评论数据
  getReviews(productId) {
    db.getReviews(productId).then((result) => {
      const data = result.data;

      if (data.length) {
        this.setData({
          reviewList: data.map(review => {
            console.log('review: ', review);
            // review.createTime = util.formateTime(review.createTime, 'yyyy/MM/dd');
            // review.images = review.images ? review.images.split(';') : [];
            return review;
          })
        })
      }
    }).catch((err) => {
      console.error(err);
    });
  },

  // 预览图片
  previewImage(event) {
    let target = event.currentTarget;
    let src = target.dataset.src;

    wx.previewImage({
      current: src,
      urls: [src]
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