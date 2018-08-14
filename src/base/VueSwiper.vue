<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="slide">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    props:['swiperSlides'], // 轮播图片来源从页面级组件获取
    name: 'carousel',
    data() {
      return {
        swiperOption: {
          direction: 'horizontal',
          loop: true,
          autoplay: 3500,
          setWrapperSize: true,
          pagination: {
            el: '.swiper-pagination'
          },
          observeParents: true
        }
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
 img{
   width: 100%;
 }
</style>
