<template>
  <div class="playlist" ref="playlist">
  	<div class="content">
  		<div class="pylst_header">
  			<div class="backgr">
  				<img :src="recommendDetail.logo">
  			</div>
  			<div class="h-left">
  				<img :src="recommendDetail.logo">
  			</div>
  			<div class="h-right">
  				<p class="name">{{recommendDetail.dissname}}</p>
  				<p class="nickname">{{recommendDetail.nickname}}</p>
  			</div>
  		</div>
  		<div class="middle">
  			<div class="tags">
  				<span>标签:</span>
  			</div>
  			<div class="desc">
  				<span>简介:</span><span v-html="recommendDetail.desc"></span>
  			</div>
  		</div>
  		<div class="bottom">
  			<div class="tit">歌曲列表</div>
  			<div class="musicList">
  				<ul>
  					<li @click="selectSong(player, $event)" v-for="(player, $index) in recommendDetail.songlist" class="item">
  						<div class="item-left">{{$index+1}}</div>
  						<div class="item-right border-1px">
  							<div class="title">{{player.songname}}</div>
  							<p class="desc">{{player.singer[0].name}} · {{player.albumname}}</p>
  						</div>
  					</li>
  				</ul>
  			</div>
  		</div>
  	</div>
  	<playerRecommend :player="selectedSong" ref="player"></playerRecommend>
  </div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import {getRecommendDetail} from 'api/playlist';
	import {ERR_OK} from 'api/config';
	import playerRecommend from 'components/player/playerRecommend';
	export default {
		props: {
			playlist: {
				type: Array,
				default: ''
			},
			item: {
				type: Object,
				default: ''
			},
			dissid: {
				type: Number,
				default: ''
			}
		},
		data() {
			return {
				recommendDetail: [],
				selectedSong: {}
			};
		},
		created() {
			this._getRecommendDetail();
		},
		methods: {
			_getRecommendDetail() {
				getRecommendDetail(this.dissid).then((res) => {
					console.log(this.dissid);
					if (res.code === ERR_OK) {
						this.recommendDetail = res.cdlist[0];
						this.$nextTick(() => {
							if (!this.scroll) {
								this.scroll = new BScroll(this.$refs.playlist, {
									click: true
								});
							} else {
								this.scroll.refresh();
							}
						});
					}
				});
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
			playerRecommend
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.playlist
		position: fixed
		z-index: 110
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: #fff
		.content
			.pylst_header
				position: relative
				width: 100%
				height: 205px
				display: flex
				.backgr
					position: fixed
					width: 100%
					height: 205px
					filter: blur(40px)
					img
						width: 100%
						height: 100%
						opacity: 0.7
				.h-left
					flex: 0 0 175px
					width: 175px
					z-index: 200
					img
						width: 145px
						height: 145px
						padding: 30px 15px
				.h-right
					flex: 1
					padding-top: 30px
					z-index: 200
					color: #fff
					.name
						display: i
						font-size: 17px
						padding-bottom: 20px
						line-height: 30px
					.nickname
						font-size: 12px
			.middle
				width: 100%
				height: 115px
				padding: 0 15px
				.tags
					padding: 10px 0
					line-height: 20px
					font-size: 14px
					color: #666
				.desc
					margin-right: 15px
					font-size: 14px
					height: 60px
					line-height: 20px
					color: #666
					overflow: hidden
					span
						margin-right: 15px
			.bottom
				position: relative
				width: 100%
				.tit
					padding-left: 15px
					height: 23px
					line-height: 23px
					font-size: 12px
					color: #666
					background: #eeeff0
				.musicList
					.item
						display: flex
						width: 100%
						height: 60px
						padding-left: 15px
						.item-left
							flex: 0 0 24px
							width: 24px
							font-size: 18px
							margin-right: 15px
							line-height: 60px
							color: #999
						.item-right
							flex: 1
							border-1px(rgba(7, 17, 27, 0.1))
							overflow: hidden
							margin-right: 15px
							.title
								font-size: 18px
								padding-top: 10px
								white-space: nowrap
								text-overflow: ellipsis
								overflow: hidden							
							.desc
								font-size: 14px
								padding-top: 8px
								color: #888
								white-space: nowrap
								text-overflow: ellipsis
								overflow: hidden

</style>
