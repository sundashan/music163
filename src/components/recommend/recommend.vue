<template>
  <div class="recommend" ref="recommendScroll">
  	<div>
	  	<div class="content">
		  	<div class="recommend-list">
		  		<h1 class="title">推荐歌单</h1>
		  		<ul class="ull">
		  			<li @click="selectItem(item, dissid)" v-for="(item, $index) in playlist" class="item">
		  				<div class="remd_img">
		  					<img width="100%" v-lazy="item.imgurl">
		  				</div>
		  				<span class="text">{{item.dissname}}</span>
		  			</li>
		  		</ul>
		  	</div>
		  	<div class="newsong">
		  		<h1 class="title">最新音乐</h1>
		  		<ul>  
		  			<li  @click="selectSong(player, $event)" v-for="(player, $index) in newlist" class="news border-1px">
		  				<div class="name">{{player.data.songname}}</div>
		  				<p class="desc">{{player.data.singer[0].name}} · {{player.data.albumname}}</p>
		  			</li>
		  		</ul>
		  	</div>
	  	</div>
	</div>
	<player :player="selectedSong" ref="player"></player>
	<router-view :playlist="selectedRecommed, dissid"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import {getPlaylist, getNewList} from 'api/recommend';
	import {ERR_OK} from 'api/config';
	import player from 'components/player/player';

	export default {
		data() {
			return {
				recommends: [],
				playlist: [],
				newlist: [],
				selectedSong: {},
				selectedRecommed: {},
				dissid: []
			};
		},
		created() {
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.recommendScroll, {
						click: true
					});
				}
			});
			this._getPlaylist();
			this._getNewList();
		},
		methods: {
			_getPlaylist() {
				getPlaylist().then((res) => {
					if (res.code === ERR_OK) {
						this.playlist = res.data.list.slice(0, 6);
						this.$nextTick(() => {
							this.scroll.refresh();
						});
					}
				});
			},
			_getNewList() {
				getNewList().then((res) => {
					if (res.code === ERR_OK) {
						this.newlist = res.songlist.slice(0, 10);
						this.$nextTick(() => {
							this.scroll.refresh();
						});
					}
				});
			},
			selectItem(item, dissid) {
				this.$router.push({
					path: `/recommend/${item.dissid}`
				});
				this.selectedRecommed = item;
				this.dissid = item.dissid;
			},
			selectSong(player, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedSong = player;
				this.$refs.player.show();
			}
		},
		components: {
			player
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
		overflow: hidden
		.content
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
