import('node-fetch').then(async (fetch) => {
  const liot = require('./libraries/Liot');
  
  // getUserInfo 함수가 Promise를 반환하도록 수정
  let userInfo = await liot.getUserInfo("Hide on bush");

  // getUserInfo 함수에서 반환된 값이 있다고 가정
  console.log(userInfo);
}).catch((error) => {
  console.error('모듈을 불러오는 중 오류 발생:', error);
});