<template>
	<div class="searchBox">
		<i class="icon-search"></i>
		<input class="box" v-model="query" :placeholder="placeholder">
		<span @click="clear" v-show="query" class="del">×</span>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data() {
			return {
				query: ''
			};
		},
		methods: {
			clear() {
				this.query = '';
			},
			setQuery(query) {
				this.query = query;
			}
		},
		created() {
			this.$watch('query', (newQuery) => {
				this.$emit('query', newQuery);
			});
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	.searchBox
		display: flex
		align-items: center
		box-sizing: border-box
		width: 100%
		padding: 0 6px
		height: 30px
		background: #EBECEC
		border-radius: 20px
		.box
			flex: 1
			margin: 0 5px
			line-height: 18px
			font-size: 14px
			color: #333
			background: #EBECEC
			outline:medium
		.del
			color: #333
			padding: 10px
</style>
