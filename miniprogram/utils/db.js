/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:04 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-19 12:55:03
 */

const util = require('./util')

const db = wx.cloud.database({
    env: 'wxstore-devzhang'
})

module.exports = {
    // 获取商品列表
    getProductList() {
        return db.collection('product').get();
    },

    // 获取商品详情
    getProductDetail(id) {
        return wx.cloud.callFunction({
            name: 'productDetail',
            data: {
                id
            }
        })
    },

    // 立即购买商品
    addToOrder(data) {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'addToOrder',
                data,
            });
        })
        .catch(() => {
            wx.showToast({
                title: 'Please Login First',
                icon: 'none'
            })
            return {};
        })
    },

    // 添加购物车 
    addToCart(data) {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'addToCart',
                data,
            });
        })
        .catch(() => {
            wx.showToast({
                icon: 'none',
                title: 'Please Login First'
            })
            return {};
        })
    },

    // 获取订单数据
    getOrders() {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'getOrders'
            })
        })
        .catch(() => {
            wx.showToast({
                icon: 'none',
                title: 'Please Login First'
            })
            return {};
        })
    },

    // 获取购物车列表
    getCartList() {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'getCartList'
            })
        })
        .catch(() => {
            wx.showToast({
                icon: 'none',
                title: 'Please Login First'
            })
            return {};
        })
    },

    // 更新购物车
    updateCart(list) {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'updateCart',
                data: {
                    list
                }
            })
        }).catch(() => {
            wx.showToast({
                icon: 'none',
                title: 'Please Login First'
            })
            return {}
        });
        
    },

    // 添加评论
    addReview(data) {
        return util.isAuthenticated()
        .then(() => {
            return wx.cloud.callFunction({
                name: 'addReview',
                data,
            })
        }).catch(() => {
            wx.showToast({
                icon: 'none',
                title: 'Please Login First'
            })
            return {}
        });
    },

    // 获取评论数据
    getReviews(productId) {
        return db.collection('review').where({
            productId
        }).get();
    },

    // 上传图片
    uploadImage(imgPath) {
        return wx.cloud.uploadFile({
            cloudPath: `review/${util.getId()}`,
            filePath: imgPath
        })
    },
}