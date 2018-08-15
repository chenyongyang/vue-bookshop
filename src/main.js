import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

import VueLazyload from 'vue-lazyload';
import error from './assets/error.jpg';
import loading from './assets/loading.jpg';
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: error,
    loading: loading,
    attempt: 1
});

router.beforeEach(function(to, from, next) {
    document.title = to.meta.title;
    next();
});

import store from './store';

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})