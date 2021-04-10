<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  /* 没有swiper中的index.js得这样导入
  import Swiper from "components/common/swiper/Swiper.vue"
  import SwiperItem from "components/common/swiper/SwiperItem.vue" */
  import {Swiper,SwiperItem} from "components/common/swiper/index.js"
  export default {
    name:'HomeSwiper',
    data () {
      return {
        isLoad:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        if (!this.isLoad) {//加一层if判断的目的：因为轮播图有四张，发送事件的话得发送四次，而我们只需要一次就行了
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }
      }
    },
  }
</script>

<style scoped>

</style>
