/*
 * @Author: zhang 
 * @Date: 2019-08-07 13:55:55 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-12 14:36:34
 */

const util = require('../../utils/util');
const db = require('../../utils/db');

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
    this.setData({
      userInfo: event.detail.userInfo
    })

    this.getCartList();
  },

  // 获取购物车列表
  getCartList() {
    wx.showLoading({
      title: 'Loading...'
    });

    db.getCartList().then(result => {
      wx.hideLoading();

      const data = result.result;

      if (data.length) {

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

  // 编辑
  onTapEditCart() {
    if (!this.data.isCartEdit) {
      this.setData({
        isCartEdit: true
      })
    } else {
      this.updateCart();
    }
  },

  // 增加或减少购物车商品数量
  adjustProductCount(event) {
    const dataset = event.currentTarget.dataset;
    const adjustType = dataset.type;
    const productId = dataset.id;
    const cartCheckMap = this.data.cartCheckMap;
    let cartList = this.data.cartList;
    const productToAdjust = cartList.find(product => product.productId === productId) || {};

    if (adjustType === 'add') {
      productToAdjust.count ++;
    } else {
      if (productToAdjust.count >= 2) {
        productToAdjust.count --;
      } else {
        delete cartCheckMap[productId];

        cartList = cartList.filter(product => product.productId !== productId)
      }
    }

    const cartTotal = this.updateTotalPrice(cartList, cartCheckMap);

    this.setData({
      cartTotal,
      cartList
    })

    if (!cartList.length) {
      this.updateCart();
    }
  },

  // 更新购物出
  updateCart() {
    wx.showLoading({
      title: 'Loading...'
    })

    const cartList = this.data.cartList;

    db.updateCart(cartList).then((result) => {
      wx.hideLoading();

      const data = result.result;

      if (data) {
        this.setData({
          isCartEdit: false
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

  // 结算
  onTapCheckout() {
    if (this.data.cartTotal == 0) {
      wx.showToast({
        title: 'Please Select Items',
        icon: 'none'
      })
      return;
    }

    wx.showLoading({
      title: 'Loading...'
    });

    const cartCheckMap = this.data.cartCheckMap;
    const cartList = this.data.cartList;
    const productsToCheckout = cartList.filter(product => cartCheckMap[product.productId]);
    const cartToUpdate = cartList.filter(product => !cartCheckMap[product.productId]);

    db.addToOrder({
      list: productsToCheckout,
      isCheckout: true
    }).then(result => {
      wx.hideLoading();

      const data = result.result;

      if (data) {
        wx.showToast({
          title: 'Succeed',
          icon: 'none'
        })

        this.setData({
          cartList: cartToUpdate
        })

        this.getCartList();
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