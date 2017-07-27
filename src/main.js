import './style/usage/page/common.scss';
import './style/font/iconfont.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import App from './App.vue';
import NewsContent from './components/NewsContent/NewsContent';
import MenuContent from './components/MenuContent/MenuContent';
import DetailContent from './components/DetailContent/DetailContent';
import store from './store.js';
import { Swipe, SwipeItem, LoadMore, InfiniteScroll, Lazyload } from 'mint-ui';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component('mt-loadmore', LoadMore);
Vue.component('mt-swipe', Swipe);
Vue.component('mt-swipe-item', SwipeItem);

let routes = [
  {path: '/', component: NewsContent},
  {path: '/menu', component: MenuContent},
  {path: '/detail', component: DetailContent}
];
let router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
