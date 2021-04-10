<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControlCopy" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <p id="p1">本周推荐</p>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl" />
      <!-- <goods-list :goods="showGoods" /> -->
      <goods-list :imgxx="img1" v-if="isimgxx === 0"  :numimg="this.numimg"/>
      <goods-list :imgxx="img2" v-else-if="isimgxx === 1" :numimg="this.numimg"/>
      <goods-list :imgxx="img4" v-else-if="isimgxx === 2" :numimg="this.numimg"/>
      <p>-----------------------------------------------</p>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top><!-- 监听组件上的点击，实现返回顶部的功能。原生元素，比如button、div，@click=""都可以直接监听到其上的点击，而@click="backClick"是监听不到组件上的点击的，需要加上native -->

    <h1 style="margin-top:1800px">这里是首页</h1>
    <p>首页的内容</p>
    <img style="height:300px;width:300px" :src="img1" alt="">
    <img style="height:300px;width:300px" :src="img2" alt="">
    <img style="height:300px;width:300px" :src="img3" alt="">
    <img style="height:300px;width:300px" :src="img4" alt="">
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
import BackTop from "components/content/backTop/BackTop.vue"

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata,getHomeGoods,getPublicData} from "network/home.js"
import {debounce} from "commonjs/utils.js"


export default {
  name:"Home",
  data() {
    return {
      banners:[],//轮播图数据
      recommends:[],//轮播图下边的4条数据
      goods:{//商品展示数据
         'pop':{page:0,list:[]},  
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
      currentType:'pop',//TabControl默认展示那条
      isShowBackTop:false,//返回顶部按钮是否显示
      tabOffsetTop:0,//TabControl组件的offsetTop属性值
      isTabFixed:false,//TabControl组件是否添加吸顶效果
      saveY:0,//记录离开Home时的位置信息
      img1:"",//自己模拟的4张图片
      img2:"",
      img3:"",
      img4:"",
      isimgxx:0,//自己模拟的商品展示数据
      numimg:48//自己模拟的商品展示数据展示多少条
      
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    
  },
  created() {//生命周期函数，创建出来组件时回调的
    //请求多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    this.getPublicData()
  },
  mounted() {//生命周期函数，挂载到整个DOM上时回调的,this.$refs.scroll放到mounted更为保险可靠。理论上mounted排在created后面
    // 事件总线接收监听
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',()=>{
      //this.$refs.scroll.refresh()//没使用防抖函数之前，频繁调用
      refresh()//使用防抖函数,直接调用上边debounce函数中生成的新函数
    });

    /* 获取TabControl的offsetTop
    console.log(this.$refs.tabControl.offsetTop); 取不到offsetTop，组件没有offsetTop属性
    console.log(this.$refs.tabControl.$el.offsetTop); 通过$el取到了offsetTop数值也不对，因为图片等资源加载问题，在mounted这个生命周期函数中，可能还没加载完
                                                      我们可以找个地方监听图片加载完成再获取offsetTop，像下面这样延迟定时器是我自己想的笨办法
    setTimeout(()=>{
      console.log(this.$refs.tabControl.$el.offsetTop);
    },5000) */
  },
  destroyed() {//生命周期函数，组件销毁时调用
    console.log("组件销毁时调用");
  },
  activated() {//生命周期函数，回来组件时调用
    this.$refs.scroll.scrollTo(0,this.saveY,1);//这个时间不能设置为0，否则会触发BackTop组件，我也不知道为啥
    this.$refs.scroll.refresh()
  },
  deactivated() {//生命周期函数，离开组件时调用
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /* 网络请求相关的方法 */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        /* this.goods[type].list.push(...res.data.list) 因为我没有后端接口，所以先注释掉，但他的功能已经完整，只要有正确的接口就能用 */
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()//完成上拉加载更多
      })
    },
    getPublicData(){
      getPublicData().then(res =>{
        this.img1 = res.url1
        this.img2 = res.url2
        this.img3 = res.url3
        this.img4 = res.url4
      })
    },
    /* 事件监听相关的方法 */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';this.isimgxx = 0
          break;
        case 1:
          this.currentType = 'new';this.isimgxx = 1
          break;
        case 2:
          this.currentType = 'sell';this.isimgxx = 2
          break;
      }
      this.$refs.tabControlCopy.currentIndex = index;//这行与下边那行的目的就是为了让两个TabControl组件选择的状态统一
      this.$refs.tabControl.currentIndex = index;
    },
    backClick(){
      /* this.$refs.scroll指的是Home.vue上边那个ref=scroll的组件，.scroll指的是Scroll.vue组件中data中的scroll属性 */
      //this.$refs.scroll.scroll.scrollTo(0,0,500)  /* .scrollTo(0,0,500)这是一个写好的方法，作用是滚动页面元素到指定位置，第一个参数-x坐标，第二个参数-y坐标，第三个参数-所用时间 */
      //以上一行是直接在这写，不太优雅，我们一般是在滚动组件Scroll.vue中封装好scrollTo方法，然后在这调用，看下边一行
      this.$refs.scroll.scrollTo(0,0)//这样调用Scroll.vue中封装好scrollTo方法，可以省去一步.scroll，还有第三个参数（第三个参数已经默认设置好了，当然也可以再重新赋值）
    },
    contentscroll(position){
      this.isShowBackTop = (-position.y) > 1000  //当滚动的y坐标大于1000就显示出来BackTop.vue组件
      this.isTabFixed = (-position.y) > this.tabOffsetTop// 决定TabControl是否吸顶(是否添加position:fixed属性)
    },
    loadMore(){
      this.getHomeGoods(this.currentType)//这是有后端接口的情况下，上拉加载数据。
      console.log("新的一次上拉加载数据");//上拉加载更多
      this.numimg += 30 //这是我模拟的上拉加载数据。每次上拉新增30条数据
      this.$refs.scroll.scroll.refresh()//调用这个方法，重新计算可滚动区域，防止卡顿。这条和observeDOM:true和图片加载完成事件总线防抖函数，这三条我感觉作用是一样的
    },
    swiperImageLoad(){//获取TabControl的offsetTop，现在就可以确定图片已经加载完成了，offsetTop也就准确了
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop//保存下来
    }
  },
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */   /* 这行原本是为了nav-bar留出上边的高度，不让nav-bar覆盖下边的轮播图，但因为重构Home，下边第一种定义滚动容器高度的方法，要加上Better-Scroll功能，所以将这行本该实现的功能转到 .content 中了 */
    height: 100vh;/* vh视口高度,vh是CSS3中的相对长度单位，表示相对视口高度（Viewport Height），视口被均分为100单位的vh，即1vh = 1% * 视口高度 */
    padding-top: 44px;/*因为下边第二种定义滚动容器高度的方法设置了绝对定位，所以#home父元素要留出上边nav-bar的高度，不让nav-bar覆盖下边的轮播图  */
    position: relative;/*因为下边第二种定义滚动容器高度的方法设置了绝对定位，所以#home父元素要设置相对定位  */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    font-size: 20px;
    /* 使用浏览器原生滚动时，才加这几条属性，但我们现在是用Better-Scroll插件了 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  #p1{
    font-size: 16px;
    text-align: center;
    margin: 10px 0 5px;
  }
  /* .tab-control{ */
    /* 吸顶效果
       后期因为重构Home，要添加better-scroll功能，所以导致吸顶效果暂时失效，我们后期采用别的办法，具体看 码尚购\关于supermall项目.txt中的第21条
    position: sticky;
    top: 44px;
    z-index: 9;
    */
  .tab-control{
    position: relative;
    z-index: 8;
  }
  /* } */
  
  /* 第一种定义滚动容器高度的方法
  .content{
    margin-top: 44px;这行是为了nav-bar留出上边的高度，不让nav-bar覆盖下边的轮播图，所以要把#home中的padding-top: 44px;去掉
    height: calc(100% - 93px);cale是定义好的一个方法，减号前后要加一个空格。100%指的是视口高度，因为home定义了100vh。93px的由来：上边nav-bar的44px加上下边大导航的49px
    overflow: hidden;
  } */

  /* 第二种定义滚动容器高度的方法
     就是采用定位的方式，抛去上边nav-bar的44px和下边大导航的49px，中间显示出来的就是滚动容器的高度
   */
  .content{
    overflow: hidden;
    position: absolute;/*因为这设置了绝对定位，所以上边#home父元素要设置相对定位  */
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>