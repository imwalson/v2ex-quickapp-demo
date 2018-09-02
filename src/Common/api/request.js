import fetch from '@system.fetch'
import util from '../../util'

const apiRequest = function (path,options) {
  var options = options || {};
  return new Promise(function(resolve,reject){
    var headers = {
      'Content-Type': 'application/json; charset=utf-8'
    };
    var params = options.params || {},
      data = options.data || {};
    if(options && options.headers) {
      options.headers = Object.assign( headers, options.headers );
    }else{
      options.headers = headers;
    }
    // 添加 url 参数
    if (options && params) {
      for (var key in params) {
        path = util.changeURLArg(path, key, params[key]);
      }
    }
    if(!path){
      reject('request url is required');
    }
    fetch.fetch({
      url: path,
      data: data,
      method: 'GET',
      header: options.headers,
      success: function (response) {
        if(response){
          resolve(JSON.parse(response.data));
        }else{
          resolve(response.data);
        }
      },
      fail: function (error, code) {
        reject("fetch fail, code=" + code);
      }
    })
  })
};

module.exports = apiRequest;

