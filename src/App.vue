<template>
  <div id="app">
      <div class="contain">
        <transition name="fadeIn">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="fadeIn">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Head from '@/base/Head';
import Footer from '@/base/Footer';
export default {
  components:{
    Head,Footer
  },
  watch:{
    $route(){
      this.page = this.$route.path.slice(1);
    }
  },
  data(){
    return{
      page: 'home'
    }
  }
  
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
  ul,li{
    list-style: none;
  }
  .content{
    width: 100%;
    position: fixed;
    top: 40px;
    bottom: 50px;
    overflow: auto;
  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition: all 0.3s linear;
    opacity: 0;
  }
</style>
