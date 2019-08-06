/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:04 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-06 15:35:49
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
    getProductDetail() {
        return db.collection('product').doc(options.id).get();
    }
}