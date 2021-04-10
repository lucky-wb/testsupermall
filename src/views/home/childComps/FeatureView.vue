<template>
  <div class="feature">
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi04.jpg" alt="">
      <p>时尚推荐</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi06.jpg" alt="">
      <p>春冬交替</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi08.jpg" alt="">
      <p>口红化妆</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi11.jpg" alt="">
      <p>宝妈健康</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi11.jpg" alt="">
      <p>样式挂件</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi06.jpg" alt="">
      <p>男士名表</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi04.jpg" alt="">
      <p>学生工具</p>
    </a>
    </div>
    <div class="feature-item">
      <a href="#">
      <img src="~assets/img/home/yi08.jpg" alt="">
      <p>生活好帮</p>
    </a>
    </div>
    

  </div>
</template>

<script>
  export default {
    name:'FeatureView',
    data () {
      return {
      }
    },
    components: {
    },
  }
</script>

<style scoped>
  .feature{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 12px;
    padding: 6px 0 14px;
    border-bottom: 5px solid #eee;
  }
  .feature-item{
    flex: 1;
  }
  .feature img{
    width: 68px;
    height:68px;
    border-radius: 25px;
    margin-bottom: 4px;
    
  }
</style>
