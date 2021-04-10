<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <h1>详情页</h1>
    <p>商品id：{{id}}</p>
    <img style="height:300px;width:300px" src="~assets/img/home/yi04.jpg" alt="">
    <img style="height:300px;width:300px" src="~assets/img/home/yi08.jpg" alt="">
    <img style="height:300px;width:300px" src="~assets/img/home/yi11.jpg" alt="">
    <img style="height:300px;width:300px" src="~assets/img/home/yi06.jpg" alt="">
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  export default {
    name:'Detail',
    data () {
      return {
        iid:null,//真实的后台数据
        id:null,//我模拟的商品id
      }
    },
    components: {
      DetailNavBar
    },
    created() {
      this.id = this.$route.params.id
      // this.iid = this.$route.params.iid //保存iid
      // 根据iid请求详情数据
      
    },
  }
</script>

<style scoped>

</style>
