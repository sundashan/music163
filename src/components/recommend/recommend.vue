<template>
  <div class="recommend" ref="recommend">
  	<div class="recommend-content">
	  	<div class="recommend-list">
	  		<h1 class="title">推荐歌单</h1>
	  		<ul class="ull">
	  			<li v-for="item in playlist" class="item">
	  				<div class="remd_img">
	  					<img width="100%" :src="item.imgurl">
	  				</div>
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="newsong">
	  		<h1>最新音乐</h1>
	  		<ul>
	  			<li>
	  				<span class="name"></span>
	  				<span class="Singer"></span>
	  				<i></i>
	  			</li>
	  		</ul>
	  	</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import {getRecommend, getPlaylist} from 'api/recommend';
	import {ERR_OK} from 'api/config';
	import BScroll from 'better-scroll';

	export default {
		data() {
			return {
				recommends: [],
				playlist: []
			};
		},
		created() {
			this._getRecommend();
			this._getPlaylist();
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider;
						console.log(res.data.slider);
						this.$nextTick(() => {
							this.scroll = new BScroll(this.$refs.recommend, {
								click: true
							});
						});
					}
				});
			},
			_getPlaylist() {
				getPlaylist().then((res) => {
					if (res.code === ERR_OK) {
						this.playlist = res.data.list;
						console.log(res.data.list);
					}
				});
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	.recommend
		position: fixed
		width: 100%
		top: 104px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.recommend-list
				padding-top: 20px
				.title
					padding-left: 9px;
					margin-bottom: 14px
					font-size: 17px
					height: 20px
					line-height: 20px
				.ull
					display: flex
					flex-wrap: wrap;
					.item
						flex: 0 0 33.3333%
						width: 33.3333%				
						box-sizing: border-box
						align-items: center
						padding-left: 0
						padding-right: 2px
						.remd_text
							line-height: 20px
</style>
