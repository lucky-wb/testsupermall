/* 公共方法 */


 export function debounce(func,delay){//防抖函数的封装(一般都是固定格式)
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}