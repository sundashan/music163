<template>
  <div class="hot">
    <div class="hot-content">
      <div class="hotTitle">
        <span class="tit">{{picList.ListName}}</span>
        <span class="time">{{updateTime}}</span>
      </div>
      <ul>
        <li v-for="(item, $index) in hotlist" class="item">
          <div class="item-left">{{$index+1}}</div>
          <div class="item-right border-1px">
            <div class="title">{{item.data.songname}}</div>
            <p class="desc">{{item.data.singer[0].name}} · {{item.data.albumname}}</p>      
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getHotList} from 'api/recommend';
  import {ERR_OK} from 'api/config';
  
  export default {
    data() {
      return {
        hotlist: [],
        picList: [],
        updateTime: []
      };
    },
    created() {
      this._getHotList();
    },
    methods: {
      _getHotList() {
        getHotList().then((res) => {
          if (res.code === ERR_OK) {
            this.hotlist = res.songlist;
            this.picList = res.topinfo;
            this.updateTime = res.update_time;
            console.log(res.songlist);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .hot
    position: absolute
    top: 104px
    .hot-content
      .hotTitle
        background: url('./hot_music_bg_2x.jpg') center;
        width: 100%
        height: 145.88px
        .tit
          font-size: 24px
          position: absolute
          margin: 45px 0 0 20px
          color: #fff
        .time
          font-size: 12px
          display: block
          padding-left: 20px
          color: #fff
          padding-top: 95px
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
