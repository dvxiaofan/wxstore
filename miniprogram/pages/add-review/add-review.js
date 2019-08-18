/*
 * @Author: DevZhang 
 * @Date: 2019-08-17 17:45:10 
 * @Last Modified by: DevZhang
 * @Last Modified time: 2019-08-18 22:36:11
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
    userInfo: null,
    previewImages: []
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

  // 评论输入框事件
  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  // 设置商品信息
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
  
  // 添加评论事件
  addReview(event) {
    let content = this.data.reviewContent;
    if (!content) return;

    wx.showLoading({
      title: 'Submiting...'
    })

    db.addReview({
      userName: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      productId: this.data.product.productId
    }).then((result) => {
      wx.hideLoading();

      const data = result.result;
      if (data) {
        wx.showToast({
          title: 'Succeed',
          icon: 'none'
        });

        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
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

  // 添加图片\
  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          previewImages: res.tempFilePaths
        })
      }
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