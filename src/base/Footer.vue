<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-weibiaoti2010101"></i>
            <span>列表</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia"></i>
            <span>添加</span>
        </router-link>
        <router-link to="/collect">
            <i class="iconfont icon-shoucang"></i>
            <span>购物车</span>
         </router-link>
    </div>
</template>

<script>
export default {
   
}
</script>

<style scoped lang="less">
    .footer{
        position: fixed;
        bottom: 0px;
        left: 0px; //至此会导致脱离文档流，高度塌陷，所以加上width:100%
        width: 100%;
        height: 50px;
        display: flex;
        border: 1px solid #ccc;
        a{
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            align-items: center;
            color: lightgreen;
        }
    }
    a.router-link-active{
        color: red;
    }
</style>
