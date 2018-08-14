import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () =>
                import ('../components/Home.vue'),
            meta: {
                keepAlive: true,
                title: '首页'
            }
        },
        {
            path: '/collect',
            component: () =>
                import ('../components/Collect.vue'),
            meta: {
                title: '收藏页'
            }
        },
        {
            path: '/list',
            component: () =>
                import ('../components/List.vue'),
            meta: {
                title: '列表页'
            }
        },
        {
            path: '/detail/:id',
            component: () =>
                import ('../components/Detail.vue'),
            name: 'Detail',
            meta: {
                title: '详情页'
            }
        },
        {
            path: '/add',
            component: () =>
                import ('../components/Add.vue'),
            meta: {
                title: '添加页'
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})