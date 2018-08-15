<template>
    <div>  
        <Head :back="true" @to-top="toTop">列表页</Head>
        <div class="content" ref="scroll" @scroll="showMore">
            <Dialog :isShow="flag">已删除！</Dialog>
            <ul>
                <router-link :to="{name:'Detail',params:{id:book.bookId}}" v-for="(book,index) in books" :key="index" tag="li">
                    <img v-lazy="book.bookCover">
                    <div>
                        <h4>{{ book.bookName }}</h4>
                        <p>{{ book.bookInfo }}</p>
                        <b>{{ book.bookPrice }}</b>
                        <div class="btn-list">
                            <button @click.stop="remove(book.bookId)">删除</button>
                            <button @click.stop="addCart(book)">添加</button>
                        </div>
                    </div>                   
                </router-link>
            </ul>
            <p v-if="!hasMore" class="nomore">已经没有数据啦！</p>
        </div>
    </div>
</template>

<script>
import Head from '@/base/Head.vue';
import {pagination,removeBook} from '@/api/index.js';
import Dialog from '@/base/Dialog.vue';
export default {
    created(){
        this.getData();
    },
    mounted(){
        let scroll = this.$refs.scroll;
        let top = scroll.offsetTop;
        let distance = 0;
        let isMove = false;
        scroll.addEventListener('touchstart',(e)=>{
            if(scroll.scrollTop != 0 || scroll.offsetTop != top) return
            let start = e.touches[0].pageY; 
            let move = (e)=>{
                isMove = true;
                let current = e.touches[0].pageY; 
                distance = current - start; 
                if(distance>0){
                    if(distance<=50){ 
                        scroll.style.top = distance + top + 'px';
                    }else{
                        distance = 50;
                        scroll.style.top = top + 50 + 'px';
                    }
                    
                }else{
                    scroll.removeEventListener('touchmove',move);
                    scroll.removeEventListener('touchend',end);
                }
            };
            let end = (e)=>{
                if(!isMove) return;
                isMove = false;             
                clearInterval(this.timer1);
                this.timer1 = setInterval(()=>{
                    if(distance <= 0){
                        clearInterval(this.timer1);
                        distance = 0;
                        scroll.style.top = top + 'px';
                        scroll.removeEventListener('touchmove',move);
                        scroll.removeEventListener('touchend',end);
                        this.hasMore = true;
                        this.books = [];
                        this.hasMore = true;
                        this.getData();
                        return;
                    }   
                    distance -= 1;
                    scroll.style.top = top + distance + 'px';
                },1)
            };
            scroll.addEventListener('touchmove',move);
            scroll.addEventListener('touchend',end);
        },false);
    },
    data(){
        return {
            books:[],
            flag: false,
            offset: 0,
            hasMore: true,
            isLoading: false
        }
    },
    components:{
        Head,Dialog
    },
    methods:{
        addCart(book){
            this.$store.commit('addCart',book);
        },
        async getData(){
            if(this.hasMore && !this.isLoading){
                this.isLoading = true;
                let {hasMore,result} = await pagination(this.offset);
                this.hasMore = hasMore;
                this.books = [...this.books,...result];
                this.offset = this.books.length;
                this.isLoading = false;
            }
        },
        async remove(id){ 
            let res = await removeBook(id);
            this.books = this.books.filter(item=>item.bookId !== id);
            if(res.data.state === 200){
                this.flag = true;
                setTimeout(() => {
                    this.flag = false;
                }, 500);
            }
        },
        more(){
            this.getData();
        },
        showMore(){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
                if(scrollTop + clientHeight +20 >= scrollHeight){
                    this.getData();
                }
            },20);
        },
        toTop(){
            clearInterval(this.timer2);
            let index = this.$refs.scroll.scrollTop;
            this.timer2 = setInterval(()=>{
                if(index <= 0){
                    clearInterval(this.timer2);
                    index = 0;
                    this.$refs.scroll.scrollTop = 0;
                    return;
                }
                index -= 50;
                this.$refs.scroll.scrollTop = index;
            },1);
        }
    }
}
</script>

<style scoped lang="less">
.content{
    ul{
        padding: 10px; 
        li{
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #f1f1f1;
            img{
                width: 130px;
                height: 150px;
            }
            h4{
                font-size: 20px;
                line-height: 35px;
            }
            p{
                color: #2a2a2a;
                line-height: 25px;
            }
            b{
                color: red; 
            }
            button{
                display: block;
                width: 60px;
                height: 35px;
                background: orangered;
                color: #fff;
                border: none;
                border-radius: 15px;
                outline: none;
                margin: 10px 0;
            }
        }
    }
    .nomore{
       text-align: center;
    }
    .btn-list{
        display: flex;
        justify-content: space-around;
    }
}

</style>
