// 云函数入口文件
const cloud = require('wx-server-sdk')

// 由于有两个环境变量，这里必须写明， 否则会报错
cloud.init({
  env: 'wxstore-devzhang'
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id;

  const productRes = await db.collection('product').doc(id).get()
  const product = productRes.data;

  return product;
}