<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">  
                <div class="swiper-slide" v-for="(slider,key) in swiperSlider" :key="key">
                    <img :src="slider" :alt="slider" class="swiper-img">
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev btStyle"></div>
            <div class="swiper-button-next btStyle"></div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js';
export default {
    props:['swiperSlides'],
    created(){ 
    },
    mounted(){
        // 初始化swiper的操作，实际上是操作dom，需要等待dom渲染完毕，因此不能放在created
        let mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay:{
                delay: 500
            },
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    },
    data(){
        return {}
    }
}
</script>

<style scoped>
    @import url('swiper/dist/css/swiper.min.css');
    .swiper-container {
        width: 100%;
        height: 200px;
    }
    .swiper-img{
        width: 100%;
    }
    .btStyle{
        background-size: 16px 20px;
    }
</style>


