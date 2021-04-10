<template>
    <tabbar>
      <tabbar-item path="/home" activeColor="#d4237a">
        <img slot="item-icon" src="~assets/img/tabbar/home1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home2.svg" alt="">
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path="/category"  activeColor="#d4237a">
        <img slot="item-icon" src="~assets/img/tabbar/classification1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/classification2.svg" alt="">
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path="/cart"  activeColor="#d4237a">
        <img slot="item-icon" src="~assets/img/tabbar/shoppingcart1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shoppingcart2.svg" alt="">
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path="/profile"  activeColor="#d4237a">
        <img slot="item-icon" src="~assets/img/tabbar/mine1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/mine2.svg" alt="">
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tabbar>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar"
import TabbarItem from "components/common/tabbar/TabbarItem.vue"

export default {
  name: 'MainTabbar',
  components:{
    Tabbar,
    TabbarItem,
  }
}
</script>

<style>

</style>
