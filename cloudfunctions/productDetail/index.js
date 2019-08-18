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

  // 评论详情
  const productRes = await db.collection('product').doc(id).get()
  const product = productRes.data;

  // 评论条数
  const reviewCountRes = await db.collection('review').where({
    productId: id,
  }).count();
  product.reviewCount = reviewCountRes.total;

  // 第一条评论
  const firstReviewRes = await db.collection('review').where({
    productId: id,
  }).limit(1).get();
  product.firstReview = firstReviewRes.data[0];

  return product;
}