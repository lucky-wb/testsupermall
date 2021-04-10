<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="main">
      <div class="left">
        <div v-for="(item,index) in shangpin" :key="index" class="left-item">{{item}}</div>
      </div>
      <div class="right">
        <div v-for="(item,index) in 5" :key="index" class="right-item">
          <img src="~assets/img/home/yi04.jpg" alt="">
          <p>学生潮牌</p>
        </div>
      </div>
    </div>

    <h1>这里是分类</h1>
    <p>分类的内容</p>
    <div class="content" >
      <ul v-for="(item,index) in 150" :key="index" >
        <li>原生JS实现局部滚动{{item}}</li>
      </ul>
    </div>
    <br>
    <div class="content01" ref="aaaa"><!-- 实现滚动，外边需要一个容器(class为content01的div)，里边是滚动内容(下一行那个div)。这个容器必须有高度，手动设置也行，继承父元素高度也行。ref起一个别名，方便下方mounted()中使用 -->
      <div><!-- 注意：因为下面的ul是v-for生成的，所以需要这层div。如果下面的ul不是v-for生成的，就不用这层div了 -->
        <button @click="btnClick">按钮</button>
        <ul v-for="(item,index) in 150" :key="index" >
          <li>better-scroll演示数据{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import BScroll from 'better-scroll'
export default {
  name:"Category",
  data() {
    return {  
      scroll:null,
      shangpin:['休闲裤','夏季套装','春秋套装','圆领卫衣','冬季套装','短袖','加绒夹克','长袖T恤','连帽卫衣','夹克外套','半价专区','棉衣','潮牌男鞋']
    }
  },
  components:{
    NavBar
  },
  mounted() {
    // new BScroll(this.$refs.aaaa,{}) //简单的使用:  this.$refs.aaaa可以替换为'.content01'，想让谁滚动，这个参数就传入谁
    this.scroll = new BScroll(document.querySelector('.content01'),{//document.querySelector('.content01')可以替换为this.$refs.aaaa,推荐使用起别名的方式ref
      probeType:3,//监听滚动
      pullUpLoad:true,//上拉加载更多
      mouseWheel:true,//设置这行后，不仅可以手指滑动，鼠标滚轮也可以滑动了
      click:true,//这个属性设为true，滚动内部click事件才能被监听。设不设置这条，滚动内部的button上的点击事件都能监听，但div这样的元素上的点击事件就不能被监听

    })

    this.scroll.on('scroll',(position) =>{//监听滚动
      console.log(position);
    })
    this.scroll.on('pullingUp',() =>{//上拉加载更多
      console.log("上拉加载更多");
    })
  },
  methods: {
    btnClick(){
      console.log("监听滚动内部click事件")
    }
  },
}
</script>

<style scoped>
  .content{
    height: 200px;
    background-color: #00ffff;
    overflow-y: scroll;
  }
  .content01{
    height: 200px;
    background-color: #ffff00;
    overflow:hidden ;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .main{
    display: flex;
  }
  .left{
    flex-grow:1;
    height: 100vh;
  }
  .right{
    flex-grow:2;
    height: 100vh;
    
  }
  .left-item{
    margin: 2px;
    padding-left: 15px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    background-color: #f5f5f5;
  }
  .right-item img{
    height: 70px;
    width: 70px;
    border-radius: 40%;
  }
  .right-item{
    height: 100px;
    width: 70px;
    margin: 10px;
  }
</style>