export const baseUrl = 'https://api.qfh5.cn';//'http://120.76.247.5:2020'
export const apiUrl = baseUrl + '/api';
export function request(url,data={},options={}){
  url = apiUrl+url;
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      data,
      method:'get',
      ...options,
      success:({data})=>{
        resolve(data);
      },
      fail(err){
        console.log(err)
        reject(err)
      }
    })
  })
}

request.get = function(url,data={},options={}){
  options.method = 'get';
  return request(url,data,options)
}

request.post = function(url,data={},options={}){
  options.method = 'post';
  return request(url,data,options)
}

request.put = function(url,data={},options={}){
  options.method = 'put';
  return request(url,data,options)
}

request.delete = function(url,data={},options={}){
  options.method = 'delete';
  return request(url,data,options)
}

export default request;