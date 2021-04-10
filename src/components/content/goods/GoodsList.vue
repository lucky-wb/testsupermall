<template>
  <!--因为我没有后端接口，所以先注释掉，但他的功能已经完整，只要有正确的接口就能用 
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item = "item" />
  </div> -->

  <!-- 下面这是我模拟的 -->
  <div class="goods">
    <div v-for="(item,index) in this.numimg" :key="index" class="goods-item" @click="itemClick">
      <img style="height:150px;width:150px" :src="imgxx" alt="">
      <div class="goods-info">
        <p class="title">2021春季新款女装韩版宽松V领镂空套头毛衣针织打底衫短款上衣潮........</p>
        <span class="price">23.00</span>
        <span class = "collect">45次</span>
      </div>
    </div>
  </div>

</template>

<script>
import GoodsListItem from "./GoodsListItem"
  export default {
    name:'GoodsList',
    data () {
      return {
        
      }
    },
    props:{
      goods:{
        type:Array,
        default(){
          return[]
        }
      },
      imgxx:{},
      numimg:{
        type:Number,
        default:48
      }
    },
    components: {
      GoodsListItem
    },
    methods: {
      itemClick(){
        this.$router.push("/detail/" + 11111) //11111是模拟的商品id
      }
    },
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
  .goods-item{
    flex: 1;
    padding-top: 6px;
    padding-bottom: 28px;
    /* padding-left: 4px; */
    text-align: center;
    width: 48%;
    position: relative;
  }
  .goods-item img {
    
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    /* position: absolute;overflow: hidden; */
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
