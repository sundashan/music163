<template>
  <div class="song-list">
  	<ul>
  		<li v-for="song in songs" class="item">
        	<div class="content">
            	<div class="title">{{song.name}}</div>
            	<p class="desc">{{getDesc(song)}}</p>     
          </div>
  		</li>
  	</ul>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			songs: {
				type: Array,
				default: []
			}
		},
		methods: {
			getDesc(song) {
				return `${song.singer} · ${song.album}`;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.song-list
		display: flex
		align-items: center
		height: 60px
		.content
			flex: 1
			.title
	            font-size: 18px
	            padding-top: 10px
	        .desc
	            font-size: 14px
	            padding-top: 8px
	            white-space: nowrap
	            text-overflow: ellipsis
	            overflow: hidden
</style>
