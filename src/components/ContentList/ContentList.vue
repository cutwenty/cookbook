<template>
  <div class="content-list">
    <div class="content-list-header" v-if="showHeader">
      <div class="list-header-wrapper">
        <i class="iconfont">&#xe637;</i>
        <span>猜你喜欢</span>
      </div>
    </div>
    <ul class="list">
      <li class="list-item" v-for="item in listData" key="item.id">
        <div class="item-wrapper">
          <img class="list-item-img" v-lazy="item.albums[0]"/>
          <div class="list-item-name">
            <span v-text="item.title"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'content-list',
    props: ['listData', 'showHeader'],
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .content-list {
    background: #fff;
    .content-list-header {
      @include flexbox;
      @include justify-content(center);
      @include align-items(center);
      .list-header-wrapper {
        @include flexbox;
        @include justify-content(center);
        @include align-items(center);
        color: #333;
        font-size: 16px;
        padding: 3px 3px 0;
        span, i {
          margin: 0 2px;
        }
        .iconfont {
          font-size: 22px;
          color: #ef473a;
          padding-top: 2px;
        }
      }
    }
    .list {
      @include flexbox;
      @include flex-wrap(wrap);

      .list-item {
        width: 50%;
        padding: 5px;
        box-sizing: border-box;
        .item-wrapper {
          position: relative;
          .list-item-img {
            width: 100%;
            border-radius: 10px;
          }
          .list-item-name {
            position: absolute;
            padding: 5px;
            width: 100%;
            bottom: 0;
            border-radius: 0 0 10px 10px;
            background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.5));
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
