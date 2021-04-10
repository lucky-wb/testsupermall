import {request,request01} from "./request"

export function getHomeMultidata() {
  return request({
    url:"/home/multidata"
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}

export function getPublicData() {
  return request01({
    url:"/home/img.json"
  })
}

