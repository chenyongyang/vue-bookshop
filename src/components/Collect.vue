<template>
    <div>
        <Head :back="true">购物车</Head>
        <div class="content">
            <ul>
                <li v-for="(val,index) in $store.state.cartList" :key="index">
                    <img :src="val.bookCover" alt="">
                    <div class="info">
                        <p>{{ val.bookName }}</p>
                        <p class="price">￥{{ (val.bookCount * val.bookPrice) | toFixed }}</p>
                        <!-- <button class="del" @click="del(val)">删除</button>  -->
                        <div class="btn-list">
                            <button @click="add(val)">+</button>
                                <strong>{{ val.bookCount }}</strong>
                            <button @click="minis(val)">-</button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="pay" v-show="!isPay">
                <div class="check">
                    <input type="checkbox" name="" id="">
                    全选
                </div>
                <div class="pay-btn">
                    <div>
                        共{{ count }}件商品
                        <p>合计：<span>{{ totalPrice | toFixed}}</span>元</p> 
                    </div>
                    <button @click="pay">去结算</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '@/base/Head.vue';
// import {mapState,mapGetters} from 'vuex';
export default {
    data(){
        return {
            isPay: false
        }
    },
    filters:{
        toFixed: function(value){
            return value.toFixed(2);
        }
    },
    components: {Head},
    computed: {
        // ...mapGetters(['count']),
        // ...mapState(['cartList']), // vuex提供的语法糖，也可以采用以下写法
        // cartList(){
        //     return this.$store.state.cartList;
        // },
        count(){
            return this.$store.getters.count;
        },
        totalPrice(){
            return this.$store.getters.totalPrice;
        }
    },
    methods: {
        add(book){
            this.$store.commit('addCount',book);
        },
        minis(book){
            this.$store.commit('minisCount',book);
        },
        del(book){
            this.$store.commit('del',book);
        },
        pay(){
            let conf = confirm('你确认结算吗？');
            if(conf){
                this.isPay = true;
                this.$store.commit('clearAll');
            }
        }
    }
}
</script>

<style scoped lang="less">
    .content{
        background: #eee;
        width: 100%;   
        z-index: 100;
        li{
            height: 150px;
            display: flex;
            margin: 10px 0;
            padding: 10px;      
            background: #fff;      
            img{
                width: 150px;
                height: 150px;
            }
            div.info{
                width: 50%;
                position: relative;
                h3{
                    margin: 10px 0;
                }
                button{
                    width: 40px;
                    height: 30px;
                    background: lightblue;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    font-size: 20px;
                }
                strong{
                    margin: 0 5px;
                }
                p{
                    margin-top: 10px;
                }
                button.del{
                    width: 50%;
                    margin-top: 15px;
                }
                p.price{
                    color: orangered;
                }
                div.btn-list{
                    position: absolute;
                    bottom: 10px;
                    right: 0;
                    width: 120px;
                    height: 30px;
                }
            }
        }
        div.pay{
            width: 100%;
            height: 50px;
            position: fixed;
            bottom: 55px;
            background: #fff;
            display: flex;
            justify-content: space-between;
            div.check{
                display: flex;
                align-items: center;
                input{
                    width: 15px;
                    height: 15px;
                }
                font-size: 20px;
            }
            div.pay-btn{
                display: flex;
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-right: 5px;
                    span{
                        color: orangered;
                    }
                }
            }
            button{
                width: 90px;
                height: 50px;
                background: red;
                outline: none;
                border: none;
                font-size: 16px;
                color: #fff;
            }
        }
        
    }
</style>
