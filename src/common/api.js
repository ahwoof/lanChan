import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL='http://localhost:8889';
function fetch(url, data) {
    return axios.post(url, data)
  }

export const indexApi = {
  login:function(data) {
      return fetch('/login',data)
    },
  regist:function(data) {
      return fetch('/regist',data)
    }
}
export const roomApi = {
  getHistory:function(data) {
    return fetch('/getHistory',data)
  },
  upload:function(data){
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    return axios.post('/upload',data,config)
  },
  getUserMsg:function(data){
    return fetch('/getUserMsg',data)
  },
  updateUser:function(data){
    return fetch('/updateUser',data)
  },
  recallMsg:function(data) {
    return fetch('/recallMsg',data)
  },
  getPersonHistory:function(data) {
    return fetch('/getPersonHistory',data)
  }
}
export const albumApi = {
  getAlbum:function(data){
    return fetch('/getAlbum',data)
  },
  upAlbum:function(data){
    return fetch('/upAlbum',data)
  }
}
export const dynamicApi = {
  getDynamic:function(data){
    return fetch('/getDynamic',data)
  },
  upDynamic:function(data){
    return fetch('/upDynamic',data)
  },
}
export const commentApi = {
  addComment:function(data){
    return fetch('/addComment',data)
  }
}
export const fileApi = {
  upFile:function(data){
    return fetch('/upFile',data)
  },
  getFile:function(data){
    return fetch('/getFile',data)
  }
}

export const handleUpload = function (e){
  let file = e.target.files[0];           
      let param = new FormData(); //创建form对象
      param.append('file',file,file.name);//通过append向form对象添加数据
      //添加form表单中其他数据param.append('chunk','0');
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      return param
}