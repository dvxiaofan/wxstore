/*
 * @Author: zhang 
 * @Date: 2019-08-06 13:20:51 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-06 14:24:11
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      id: 2,
      image: 'http://placekitten.com/300/300',
      name: 'Guitar',
      price: 399.80,
      source: 'SWEDEN'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'add',
      data: {
        a: 2,
        b: 7
      },
      success: function(res) {
        console.log(res.result)
      },
      fail: function(error) {
        console.log(error)
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