<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name:'Scroll',
    data () {
      return {
        scroll:null,
      }
    },
    components: {
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{//不推荐document.querySelector('.wrapper')这样的方式，因为.wrapper可能有多个，取到的DOM不准确。推荐ref方式
        observeDOM:true,//开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度，新增于 v2.1.0 版本。
                        //大佬的佳作：https://blog.csdn.net/weixin_46351593/article/details/113790753
        click:true,//加上这条，滚动内部的click事件才能被点击。设不设置这条，滚动内部的button上的点击事件都能监听，但div这样的元素上的点击事件就不能被监听
        mouseWheel:true,//设置这行后，不仅可以移动端手指滑动，PC端鼠标滚轮也可以滑动了。但除了滚动包含在内的元素能看见，包含在外的就看不见了，比如Home.vue的<h1>这里是首页</h1>
        probeType:this.probeType,//监听滚动
        pullUpLoad: this.pullUpLoad,//上拉加载更多,pullUpLoad:true自带probeType:3
      })

      if(this.probeType === 2 || this.probeType === 3){//加一层if判断，提高性能，减少无用功。只有当需要他监听的时候，他才监听。
        this.scroll.on('scroll',(position) =>{//监听滚动位置
          this.$emit('scroll',position)//通过自定义事件传到需要使用滚动功能的组件中监听打印操作
        })
      }
      if(this.pullUpLoad){//加一层if判断，提高性能，减少无用功。只有当他为true的时候，他才监听。
        this.scroll.on('pullingUp',() =>{//上拉加载更多，监听滚动到底部
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      scrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time)  //this.scroll &&  这样写的目的，先判断this.scroll这个对象加载完成了，再继续后面的操作，防止因网络延迟或反应太快产生的报错
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0  //用三元运算符，多加一层判断，有值就取出来，没有就返回0
      }
    },
  }
</script>

<style scoped>

</style>
