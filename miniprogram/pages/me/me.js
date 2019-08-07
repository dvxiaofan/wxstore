/*
 * @Author: zhang 
 * @Date: 2019-08-07 13:16:28 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-07 13:47:04
 */


const util = require('../../utils/util');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  // 登录
  onTapLogin(event) {
    if (event.detail.userInfo) {
      this.setData({
        userInfo: event.detail.userInfo
      })
    }
  },

  // 增加地址
  onTapAddress() {
    wx.showToast({
      title: 'This function is not open yet',
      icon: 'none'
    })
  },

  onTapService() {
    wx.showToast({
      title: 'This function is not open yet',
      icon: 'none'
    })
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
    })
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