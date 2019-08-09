// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wxstore-devzhang'
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID;

  const carRes = await db.collection('cart').where({
    user,
  }).get();

  const cartList = carRes.data;

  return cartList;
}