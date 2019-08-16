// pages/add-review/add-review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    reviewContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    console.log('event: ', event);
    this.setData({
      reviewContent: event.detail.value.trim()
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