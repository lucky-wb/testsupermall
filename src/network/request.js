import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL:"http://123.207.32.32:8000",//这里使用的是老师提供的免费接口，但只够实现一个轮播图和部分信息展示
    timeout:5000
  })

  instance.interceptors.request.use(config =>{
    // console.log(config);干点啥
    return config
  },err =>{
    // console.log(err);干点啥
    return Promise.reject(error);
  })
  instance.interceptors.response.use(res =>{
    // console.log(res);干点啥
    return res.data;   /* 实际应该是这样的return res */
  },err =>{
    // console.log(err);干点啥
    return Promise.reject(err);
  })

  return instance(config)
}

/* 因为我没有后端接口，所以在public中建了一个home用来模拟存放首页用到的所有数据
注意：路径直接用/home/lunbo.json，这样指的就是public文件夹中的/home/lunbo.json。千万不要用/public/home/lunbo.json
      所以下面的request01的baseURL不写就指的是public文件夹了，至于正式打包发布出错再出现路径问题就再改喽
import axios from "axios"
axios({
  url:"/home/lunbo.json"
}).then(res =>{
  console.log(res);
}) */

export function request01(config) {
  const instance = axios.create({
    baseURL:"",//因为我没有后端接口，所以在public中建了一个home用来模拟存放首页用到的所有数据
    timeout:5000
  })

  instance.interceptors.request.use(config =>{
    // console.log(config);干点啥
    return config
  },err =>{
    // console.log(err);干点啥
    return Promise.reject(error);
  })
  instance.interceptors.response.use(res =>{
    // console.log(res);干点啥
    return res.data;   /* 实际应该是这样的return res */
  },err =>{
    // console.log(err);干点啥
    return Promise.reject(err);
  })

  return instance(config)
}



