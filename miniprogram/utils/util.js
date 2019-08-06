/*
 * @Author: zhang 
 * @Date: 2019-08-06 15:33:14 
 * @Last Modified by: zhang
 * @Last Modified time: 2019-08-06 15:45:40
 */

module.exports = {
    priceFormate(price) {
        return parseFloat(Math.round(price * 100) / 100).toFixed(2);
    }
}