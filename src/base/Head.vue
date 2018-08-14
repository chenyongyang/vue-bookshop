<template>
    <div class="header" @click="toTop">
        <!-- 利用slot来传值 不用属性传值 -->
        <!-- 该用属性传值的控制返回按钮是否显示 -->
        <slot></slot>
        <i v-if="back" class="iconfont icon-fanhui" @click="goBack"></i>
    </div>
</template>

<script>
export default {
    props:{
        back:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        toTop(){
            this.$emit('to-top');
        }
    }
}
</script>

<style scoped lang="less">
    .header{
        position: fixed;
        top: 0;
        left:0;
        background: red;
        color: #fff;
        width:100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        i{
            position: absolute;
            left: 10px;
            font-size: 20px;
        }
    }
</style>
