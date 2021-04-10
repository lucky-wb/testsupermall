<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad"><!-- @load="imageLoad"是Vue中监听图片方法。原生是用img.onload=fuction(){} -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class = "collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodsListItem',
    data () {
      return {
      }
    },
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components: {
    },
    methods: {
      imageLoad(){
        /* 
        拓展：事件总线
        事件总线，可以很轻松的让孙子组件和爷爷组件产生联系。
        比如我想在爷爷组件里面处理一个孙子组件的事件，以前的方法需要this.$emit()发射自定义事件先由孙子组件发射到父亲组件，在由父亲组件发射到爷爷组件中处理。
        而我现在只需要使用事件总线的方法，直接由孙子组件直接发射事件，再有爷爷组件直接接收处理。
        步骤：先在main.js中添加Vue.prototype.$bus = new Vue()
              然后孙子组件发射 this.$bus.$emit('事件名',参数)
              爷爷组件接收  this.$bus.$on('事件名',回调函数(参数))
        */
        this.$bus.$emit('itemImageLoad')//直接发射到爷爷组件Home.vue中。
      },
      itemClick(){
        this.$router.push("/detail/" + this.goodsItem)
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
