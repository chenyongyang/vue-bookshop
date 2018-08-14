<template>
    <div class="dialog" v-show="isShow">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:['isShow']
}
</script>

<style lang="less" scoped>
    .dialog{
        width: 300px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        background: lightgreen;
        color: #fff;
        position: fixed;
        top: 40px;
        left: 40px;
        border-radius: 10px;
    }
</style>


