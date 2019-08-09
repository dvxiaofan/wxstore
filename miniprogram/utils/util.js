/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:14 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-09 10:37:47
 */

module.exports = {
    // 价格数据格式化
    priceFormate(price) {
        return parseFloat(Math.round(price * 100) / 100).toFixed(2);
    },

    // 获取用户登录信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            this.isAuthenticated().then(() => {
                wx.getUserInfo({
                    success(res) {
                        const userInfo = res.userInfo;
                        resolve(userInfo);
                    }
                })
            }).catch(() => {
                reject();
            });
        })
    },

    // 用户是否已经授权
    isAuthenticated() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo'] === true) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            })
        })
    }
}