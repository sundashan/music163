<template>
	<div class="propose">
		<ul>
			<li @click="selectSong(item,$event)" class="propose-list" v-for="item in result">
				<div class="content">
					<h1 class="name" v-html="item.songname"></h1>
					<p class="text" v-html="item.singer[0].name"></p>
				</div>
			</li>
		</ul>
		<playerRecommend :player="selectedSong" ref="player"></playerRecommend>
	</div>
</template>

<script type="text/ecmascript-6">
	import {search} from 'api/search';
	import {ERR_OK} from 'api/config';
	import playerRecommend from 'components/player/playerRecommend';

	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				page: 1,
				result: [],
				selectedSong: {}
			};
		},
		methods: {
			search() {
				search(this.query, this.page, this.showSinger).then((res) => {
					if (res.code === ERR_OK) {
						this.result = res.data.song.list;
						console.log(res.data.song);
					}
				});
			},
			selectSong(item, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedSong = item;
				this.$refs.player.show();
			}
		},
		watch: {
			query() {
				this.search();
			}
		},
		components: {
			playerRecommend
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.propose
		height: 100%
		overflow: hidden
		.propose-list
			width: 100%
			height: 55px
			border-1px(rgba(7, 17, 27, 0.1))
			.icon
				width: 20px
				height: 20px
			.content
				.name
					font-size: 16px
					line-height: 18px
					padding: 10px 0 5px 0
				.text
					font-size: 12px
					color: #888
</style>
