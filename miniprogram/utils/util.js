/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:14 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-19 12:57:26
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
    },

    // 时间格式化
    formateTime(time, reg) {
        const date = typeof time === 'string' || typeof time === 'number' ? new Date(time) : time;
        const map = {};
        map.yyyy = date.getFullYear();
        map.yy = ('' + map.yyyy).substr(2);
        map.M = date.getMonth() + 1
        map.MM = (map.M < 10 ? '0' : '') + map.M;
        map.d = date.getDate();
        map.dd = (map.d < 10 ? '0' : '') + map.d;
        map.H = date.getHours();
        map.HH = (map.H < 10 ? '0' : '') + map.H;
        map.m = date.getMinutes();
        map.mm = (map.m < 10 ? '0' : '') + map.m;
        map.s = date.getSeconds();
        map.ss = (map.s < 10 ? '0' : '') + map.s;

        return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => {
            return map[$1];
        });
    },

    // 获取ID
    getId() {
        return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1);
    }
}