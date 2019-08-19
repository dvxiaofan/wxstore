// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wxstore-devzhang'
<<<<<<< HEAD
})
=======
});
>>>>>>> f803c77bd378a1eefd2bc550d858dc81ab3f81e7

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const user = wxContext.OPENID;

  await db.collection('review').add({
    data: {
      user,
      username: event.username,
<<<<<<< HEAD
      abator: event.avatar,
      content: event.content,
      productTime: +new Date(),
=======
      avatar: event.avatar,
      content: event.content,
      productId: event.productId,
      createTime: +new Date()
>>>>>>> f803c77bd378a1eefd2bc550d858dc81ab3f81e7
    }
  })

  return {}
}