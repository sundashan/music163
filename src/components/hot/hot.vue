<template>
  <div class="hot">
    <div class="hot-content">
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
        hotlist: []
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
    .hot-content
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
