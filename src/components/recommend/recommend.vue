<template>
  <div class="recommend">
  	<div class="recommend-content">
	  	<div class="recommend-list">
	  		<h1 class="title">推荐歌单</h1>
	  		<ul class="ull">
	  			<li v-for="(item, $index) in playlist" v-show="$index < 6" class="item">
	  				<div class="remd_img">
	  					<img width="100%" :src="item.imgurl">
	  				</div>
	  				<span class="text">{{item.dissname}}</span>
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="newsong">
	  		<h1 class="title">最新音乐</h1>
	  		<ul>  
	  			<li v-for="(news, $index) in newlist" v-show="$index < 10" class="news border-1px">
	  				<div class="name">{{news.data.songname}}</div>
	  				<p class="desc">{{news.data.singer[0].name}} · {{news.data.albumname}}</p>
	  			</li>
	  		</ul>
	  	</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import {getRecommend, getPlaylist, getNewList} from 'api/recommend';
	import {ERR_OK} from 'api/config';

	export default {
		data() {
			return {
				recommends: [],
				playlist: [],
				newlist: []
			};
		},
		created() {
			this._getRecommend();
			this._getPlaylist();
			this._getNewList();
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider;
						console.log(res.data.slider);
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
			},
			_getNewList() {
				getNewList().then((res) => {
					if (res.code === ERR_OK) {
						this.newlist = res.songlist;
					}
				});
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.recommend
		position: absolute
		width: 100%
		top: 104px
		bottom: 0
		.recommend-content
			height: 100%
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
						.text
							display: -webkit-box
							height: 32px
							font-size: 13px
							line-height: 1.2
						    -webkit-line-clamp: 2
						    -webkit-box-orient: vertical
						    overflow: hidden
						    padding: 6px 2px 0 6px
			.newsong
				padding-top: 20px
				.title
					padding-left: 9px;
					margin-bottom: 14px
					font-size: 17px
					height: 20px
					line-height: 20px
				.news
					width: 100%
					height: 60px
					padding-left: 15px
					border-1px(rgba(7, 17, 27, 0.1))
					.name
						font-size: 18px
						padding-top: 10px
					.desc
						font-size: 14px
						padding-top: 8px
						white-space: nowrap
						text-overflow: ellipsis
						overflow: hidden

</style>
