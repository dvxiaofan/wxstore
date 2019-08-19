/*
 * @Author: DevZhang 
 * @Date: 2019-08-17 17:45:10 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-19 13:00:40
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

  // 输入框事件
  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  // 添加评论
  addReview(event) {
    let content = this.data.reviewContent;
    if (!content) return;

    wx.showLoading({
      title: 'Submiting...'
    });

    this.uploadImage(images => {
      db.addReview({
        userName: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        productId: this.data.product.productId,
        images
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
    })
      
  },

  // 预览图像
  previewImage(event) {
    const target = event.currentTarget;
    const src = target.dataset.src;

    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  // 上传图片
  uploadImage(callback) {
    const previewImages = this.data.previewImages;
    const images = [];

    if (previewImages.length) {
      let imageCount = previewImages.length;
      for (let i = 0; i < imageCount; i++) {
        const element = previewImages[i];
        db.uploadImage(element).then((result) => {
          images.push(result.fileID);

          if (i === imageCount - 1) {
            callback && callback(images)
          }
        }).catch((err) => {
          console.log('err: ', err);
        });
      }
    } else {
      callback && callback(images);
    }
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