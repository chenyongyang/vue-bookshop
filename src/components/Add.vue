<template>
    <div>
        <Head>添加图书</Head>
        <div class="content">
            <ul>
                <li>
                    <label for="bookCover">封面：</label>
                    <input type="text" v-model="book.bookCover" id="bookCover">
                </li>
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
                    <button @click="add">确认添加</button>
                </li>
            </ul>           
        </div>
    </div>
</template>

<script>
import Head from '@/base/Head.vue';
import {addBook} from '@/api/index.js';
export default {
    data(){
        return {
            book: {}
        }
    },
    components:{Head},
    methods:{
        async add(){
            await addBook(this.book);
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
                height: 25px;
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
</style>
