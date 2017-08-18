// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import recommend from './components/recommend/recommend';
import hotList from './components/hot/hot';
import search from './components/search/search';

Vue.use(VueRouter);

const routes = [
	{path: '/recommend', component: recommend},
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
	render: h => h(App)
}).$mount('#app');

router.push('/recommend');
