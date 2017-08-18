<template>
  <div>
    <div class="header">
      <img src="./logo.png" class="logo">
      <span class="download">下载APP</span>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/recommend">推荐音乐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/hot">热歌榜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/search">搜索</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  body
    margin: 0
    padding: 0
    .header
      position: relative
      width: 100%
      height: 64px
      top: 0
      left: 0
      background: #d43c33
      .logo
        margin-left: 10px
        width: 150px
        height: 64px
      .download
        height: 30px
        line-height: 30px
        float: right
        padding: 0 10px
        font-size: 15px
        border-radius: 15px        
        border: 1px solid #fff
        margin: 17px 10px 17px 0
        color: #fff
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1        
        text-align: center
        text-decoration: none
        position: relative
        & > a
          display: block
          font-size: 14px
          color: #333
          text-decoration: none
          &.active
            color: #d43c33
</style>
