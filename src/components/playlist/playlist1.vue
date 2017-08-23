<template>
  <div class="playlist" ref="playlist">
  	<div class="content">
  		<div class="pylst_header">
  			<!-- <div class="backgr" :src="recommendDetail.logo"></div> -->
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
  				<span>标签：</span>
  			</div>
  			<div class="desc">简介：{{recommendDetail.desc}}</div>
  		</div>
  		<div class="bottom">
  			<div class="tit">歌曲列表</div>
  			<musicList :musicList="recommendDetail" ref="musicList"></musicList>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import {getRecommendDetail} from 'api/playlist';
	import {ERR_OK} from 'api/config';
	import musicList from 'components/musicList/musicList';

	export default {
		props: {
			item: {
				type: Object
			},
			dissid: {
				type: Number
			}
		},
		data() {
			return {
				recommendDetail: []
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
						console.log(res);
						console.log(this.recommendDetail);
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
			}
		},
		components: {
			musicList
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
					height: 100%
					z-index: 1000
					filter: blur(40px)
				.h-left
					flex: 0 0 175px
					width: 175px
					img
						width: 145px
						height: 145px
						padding: 30px 15px
				.h-right
					flex: 1
					padding-top: 30px
					.name
						display: i
						font-size: 17px
						padding-bottom: 20px
					.nickname
						font-size: 12px
			.middle
				width: 100%
				height: 115px
				padding: 0 15px
				.tags
					padding: 10px 0
					line-height: 20px
				.desc
					margin-right: 15px
					font-size: 14px
					height: 60px
					line-height: 19px
					color: #666
					overflow: hidden
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
</style>
