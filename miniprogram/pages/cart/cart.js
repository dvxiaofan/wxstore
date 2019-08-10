/*
 * @Author: zhang 
 * @Date: 2019-08-07 13:55:55 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-10 16:00:36
 */

const db = require('../../utils/db');
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    cartList: [],
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取购物车内商品列表
    this.getCartList();
  },

  getCartList() {
    wx.showLoading({
      title: 'Loading...'
    });

    db.getCartList().then((result) => {
      wx.hideLoading();

      const data = result.result;

      if (data.length) {
        // 更新购物车价格
        // let checkout = 0;
        // data.forEach(product => {
        //   checkout += product.price * product.count;
        // })

        this.setData({
          cartTotal: util.priceFormate(0),
          cartList: data
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
    util.getUserInfo().then( userInfo => {
      this.setData({
        userInfo
      })

      this.getCartList();
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
  },

  // 登录
  onTapLogin(event) {
    if (event.detail.userInfo) {
      this.setData({
        userInfo: event.detail.userInfo
      })

      this.getCartList();
    }
  },

  // 选择框事件
  onTapCheck(event) {
    const checkId = event.currentTarget.dataset.id;
    const cartCheckMap = this.data.cartCheckMap;
    let isSelectAllChecked = this.data.isSelectAllChecked;
    const cartList = this.data.cartList;

    let cartTotal = 0;

    if (checkId === 'selectAll') {
      isSelectAllChecked = !isSelectAllChecked;
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked;
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId];

      isSelectAllChecked = true;

      cartList.forEach(product => {
        if (!cartCheckMap[product.productId]) {
          isSelectAllChecked = false;
        }
      })
    }

    cartTotal = this.updateTotalPrice(cartList, cartCheckMap);

    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })

  },

  // 更新商品总价
  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0;
    cartList.forEach(product => {
      if (cartCheckMap[product.productId]) checkout += product.price * product.count;
    })

    return util.priceFormate(checkout);
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