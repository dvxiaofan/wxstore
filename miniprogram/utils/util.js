/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:14 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-07 13:25:52
 */

module.exports = {
    // 价格数据格式化
    priceFormate(price) {
        return parseFloat(Math.round(price * 100) / 100).toFixed(2);
    },

    // 获取用户登录信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: (result) => {
                    if (result.authSetting['scope.userInfo'] === false) {
                        // 已拒绝授权
                        reject();
                    } else {
                        wx.getUserInfo({
                            success: function(res) {
                                const userInfo = res.userInfo;
                                resolve(userInfo);
                            }
                        })
                    }
                },
            });
        })
    }
}