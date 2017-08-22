<template>
  <div class="musicList">
    <div class="content">
      <ul>
        <li @click="selectSong(player, $event)" v-for="(player, $index) in musicList.songlist" class="item">
          <div class="item-left">{{$index+1}}</div>
          <div class="item-right border-1px">
            <div class="title">{{player.songname}}</div>
            <p class="desc">{{player.singer[0].name}} · {{player.albumname}}</p>     
          </div>
        </li>
      </ul>
    </div>
    <player :player="selectedSong" ref="player"></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import player from 'components/player/player';
  
  export default {
    props: {
    },
    data() {
      return {
        updateTime: [],
        selectedSong: {}
      };
    },
    created() {
    },
    components: {
      player
    },
    methods: {
      selectSong(player, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedSong = player;
        this.$refs.player.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  
  .musicList
    position: absolute
    width: 100%
    height； 100%
    overflow: hidden
    background: #ff00ff
    .content
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
        .item-right
          flex: 1
          border-1px(rgba(7, 17, 27, 0.1))
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
