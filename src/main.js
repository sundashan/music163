// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import recommend from './components/recommend/recommend';
import hotList from './components/hot/hot';
import search from './components/search/search';
import VueLazyLoad from 'vue-lazyload';
import store from './store';
import playlist from './components/playlist/playlist';

Vue.use(VueRouter);
Vue.use(VueLazyLoad, {
	loading: require('common/image/600.jpg')
});

const routes = [
	{
		path: '/',
		redirect: '/recommend'
	},
	{
		path: '/recommend',
		component: recommend,
		children: [
			{
				path: ':id',
				component: playlist
			}
		]
	},
	{path: '/hot', component: hotList},
	{path: '/search', component: search}
	];
const router = new VueRouter({
	routes,
	linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App),
	store
}).$mount('#app');

// router.push('/recommend');
