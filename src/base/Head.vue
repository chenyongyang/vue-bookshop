<template>
    <div class="header" @click="toTop">
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
