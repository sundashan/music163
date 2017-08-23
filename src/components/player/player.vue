<template>
  <div class="player" v-show="showPlayer" ref="player">
  	<div class="normal-palyer">
  		<div class="background">
  			<img width="100%" height="100%" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${player.data.albummid}.jpg?max_age=2592000`">
  		</div>
  		<div class="top">
  			<div class="back" @click="hide">返回</div>
        <div class="tit">
          <p class="title">{{player.data.songname}}</p>
        </div>
  		</div>
  		<div class="middle">
        <div class="middle-content">
          <div class="circle-wrapper">
            <div class="circle">
              <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${player.data.albummid}.jpg?max_age=2592000`">
            </div>
          </div>
        </div>
        <div class="lyric"></div>
  		</div>
  		<div class="bottom">
        <audio :src="`http://ws.stream.qqmusic.qq.com/${player.data.songid}.m4a?fromtag=46`" @paly="ready" autoplay="autoplay" controls="controls" loop="loop"></audio>
  		</div>
  	</div>
  	<div class="mini-palyer"></div>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex';
  import BScroll from 'better-scroll';
  import {getLyric} from 'api/song';
  import {ERR_OK} from 'api/config';

	export default {
    props: {
      player: {
        type: Object
      }
    },
		computed: {
			...mapGetters([
				'fullScreen',
				'playlist'
			])
		},
    data() {
      return {
        showPlayer: false,
        songReady: false,
        lyricList: []
      };
    },
    created() {
      this._getLyric();
    },
    methods: {
      show() {
        this.showPlayer = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.player, {
              click: true
            });
            } else {
              this.scroll.refresh();
            }
        });
      },
      hide() {
        this.showPlayer = false;
      },
      ready() {
        this.songReady = true;
      },
      _getLyric() {
        getLyric().then((res) => {
          if (res.code === ERR_OK) {
            this.lyricList = res.lyric;
            console.log(res);
            console.log(res.lyric);
          }
        });
      }
    }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .player
    position: fixed
    left: 0
    top: 0
    width: 100%
    z-index: 200
    background: #fff
    height:100%
    .normal-palyer
      width: 100%
      height: 100%
      .background
        position: fixed
        width: 100%
        height: 100%
        filter: blur(40px)
      .top
        display: flex
        height: 64px
        line-height: 64px
        border-1px: rgba(7, 17, 27, 0.1)
        font-size: 0
        .back
          flex: 0 0 50px
          width: 50px
          font-size: 16px
          padding-left: 10px
          position: absolute
          color: #fff
        .tit
          flex: 1
          font-size: 16px
          text-align: center
          color: #fff
          .title
            width: 80%
            margin-left: 12%
            height: 64px
            overflow: hidden
      .middle
        position: fixed
        width: 100%
        top: 64px
        bottom: 60px
        .middle-content
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .circle-wrapper
            position: absolute
            left: 10%
            top: 20px
            width: 80%
            height: 100%
            .circle
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 0, 0, 0.1)
              border-radius: 50%
              img
                width: 100%
                height: 100%
                border-radius: 50%
      .bottom
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        height: 60px
        audio
          width: 100%
          height: 100%
</style>
