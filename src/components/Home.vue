<template>
    <div>
        <Head>首页</Head>
        <div class="content">
            <loading v-if="loading"></loading>
            <template v-else>
                <VueSwiper :swiperSlides="sliders"></VueSwiper>
                <div class="container">
                    <h3>热门图书</h3>
                    <ul>
                        <li v-for="(hot,key) in hotBooks" :key="key">
                            <img v-lazy="hot.bookCover">
                            <b>{{ hot.bookName }}</b>
                        </li>
                    </ul>
                </div>  
            </template>
        </div>
    </div>
</template>

<script>
import Head from '@/base/Head';
import Swiper from '@/base/Swiper.vue';
import VueSwiper from '@/base/VueSwiper.vue';
import { getAll } from '@/api';
import Loading from '@/base/Loading.vue';
export default {
    components:{
        Swiper,Head,VueSwiper,Loading
    },
    created(){
        this.getData();
    },
    data(){
        return {
            sliders: [],
            hotBooks: [],
            loading: true
        }
    },
    methods:{
       async getData(){
           let [sliders,hotBooks] = await getAll();
           this.sliders = sliders;
           this.hotBooks = hotBooks;
           this.loading = false;
       }
    }
}
</script>

<style scoped lang="less">
h3{
    color: #999;
    padding: 5px 0;
}
.container{
    width: 90%;
    margin: 0 auto;
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 50%;
            text-align: center;
            margin: 5px 0;
            img{
                width: 100%;
            } 
        }
    }
}
</style>
