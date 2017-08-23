<template>
	<div class="search" ref="search">
		<div class="search-box-wrapper border-1px">
			<div class="content">
				<search-box ref="searchBox" @query="onQueryChange"></search-box>
			</div>
		</div>
		<div class="hotsearch" v-show="!query">
			<h1 class="title">热门搜索</h1>
			<ul>
				<li @click="addQuery(item.k)" v-for="item in hotkey" class="item">
					<span>{{item.k}}</span>
				</li>
			</ul>
		</div>
		<div class="search-result">
			<propose :query="query"></propose>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import searchBox from 'base/searchBox/searchBox';
	import {getHotkey} from 'api/search';
	import {ERR_OK} from 'api/config';
	import propose from 'components/propose/propose';

	export default {
		components: {
			searchBox,
			propose
		},
		data() {
			return {
				hotkey: [],
				query: ''
			};
		},
		created() {
			this._getHotkey();
		},
		methods: {
			_getHotkey() {
				getHotkey().then((res) => {
					if (res.code === ERR_OK) {
						this.hotkey = res.data.hotkey.slice(0, 10);
						this.$nextTick(() => {
							if (!this.scroll) {
								this.scroll = new BScroll(this.$refs.search, {
									click: true
								});
							} else {
								this.scroll.refresh();
							}
						});
					}
				});
			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query);
			},
			onQueryChange(query) {
				this.query = query;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.search
		position: absolute
		width: 100%
		top: 104px
		bottom: 0
		left: 0
		overflow: hidden
		.search-box-wrapper
			height: 45px
			border-1px(rgba(7, 17, 27, 0.1))
			.content
				margin: 15px
		.hotsearch
			margin-left: 15px
			.title
				font-size: 12px
				line-height: 12px
				padding: 10px 0
				color: #666
			.item
				display: inline-block
				height: 32px
				margin-right: 8px
				margin-bottom: 8px
				padding: 0 14px
				line-height: 32px
				font-size: 14px
				color: #333
				border: 1px solid rgba(7, 17, 27, 0.1)
				border-radius: 20px
		.search-result
			margin-left: 15px
</style>
