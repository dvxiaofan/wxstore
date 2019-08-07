/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:04 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-07 10:07:01
 */


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
            data: { id }
        })
    }
}