<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车(0)</div></nav-bar>
    <h1>这里是购物车</h1>
    <p>购物车的内容</p>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:"Cart",
  components:{
    NavBar
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>