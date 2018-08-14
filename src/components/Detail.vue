<template>
    <div class="detail">
        <Head :back="true">详情页</Head>
        <ul>
            <li>
                <label for="bookName">书名：</label>
                <input type="text" v-model="book.bookName" id="bookName">
            </li>
            <li>
                <label for="bookInfo">简介：</label>
                <input type="text" v-model="book.bookInfo" id="bookInfo">
            </li>
            <li>
                <label for="bookPrice">价格：</label>
                <input type="text" v-model.number="book.bookPrice" id="bookPrice">
            </li>
            <li>
                <button @click="update">确认修改</button>
            </li>
        </ul>   
    </div>
</template>

<script>
import Head from '@/base/Head.vue';
import {getOneBook,modify} from '@/api/index.js';
export default {
    components:{
        Head
    },
    created(){ 
        this.getData();
    },
    watch:{
        $route(){
            this.getData();
        }
    },
    data(){
        return {
            book: {}
        }
    },
    methods:{
        async getData(){
            this.book = await getOneBook(this.$route.params.id);
            Object.keys(this.book).length>0?void 0:this.$router.push('/list');
        },
        async update(){
            await modify(this.$route.params.id,this.book);
            this.$router.push('/list');
        }
    }
}
</script>

<style scoped lang="less">
    ul{
        margin: 50px 20px 0 20px;
        li{
            label{
                display: block;
                font-size: 25px;
            }
            input{
                margin: 10px 0;
                height: 30px;
                width: 100%;
            }
            button{
                display: block;
                width: 80px;
                height: 35px;
                background: #2aabd2;
                color: #fff;
                border: none;
                border-radius: 4px;
                outline: none;
                margin: 10px 0;
            }
        }
    }
    .detail{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 100;
    }
</style>
