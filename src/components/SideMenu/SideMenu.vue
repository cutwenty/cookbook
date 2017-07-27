<template>
  <div class="side-menu">
    <div class="header-user">
      <img class="user-img" src="../../../image/img-001.jpg"/>
      <span class="user-name">我家辉辉呢</span>
    </div>
    <div class="header-tool">
      <div class="tool-block">
        <i class="iconfont">&#xe601;</i>
        <span>收藏</span>
      </div>
      <div class="tool-block">
        <i class="iconfont" style="padding-top: 2px">&#xe626;</i>
        <span>消息</span>
      </div>
      <div class="tool-block">
        <i class="iconfont" style="padding-top: 1px">&#xe606;</i>
        <span>设置</span>
      </div>
    </div>
    <div class="body-list">
      <div
          class="list-wrapper"
          v-infinite-scroll=""
          infinite-scroll-disabled="true"
      >
        <div class="list-item home" @click="goMenu(-1)" :class="{'active': getCurrentTag === -1}">
          <i class="iconfont">&#xe623;</i>
          <span>首页</span>
          <i class="iconfont">&#xe608;</i>
        </div>
        <div class="list-item" v-for="(item, index) in list" @click="goMenu(index)" :class="{'active': getCurrentTag === index}">
          <span v-text="item.name"></span>
          <i class="iconfont">&#xe608;</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'side-menu',
    data () {
      return {
        list: []
      }
    },
    computed: {
      ...mapGetters(['getCurrentTag'])
    },
    methods: {
      goMenu (index) {
        index === -1
          ? this.$router.push({path: '/'})
          : this.setMenu(index);
        this.setTag(index);
        this.hideMenu();
      },
      setMenu (index) {
        this.$router.push({path: '/menu'});
        this.setSubMenuId(this.list[index].id, this.list[index].name);
      },
      setTag (index) {
        this.$store.dispatch({
          type: 'setTag',
          tag: index
        });
      },
      setSubMenuId (id, name) {
        this.$store.dispatch({
          type: 'setSubMenuId',
          menu: {
            id: id,
            name: name
          }
        });
      },
      ...mapActions(['hideMenu'])
    },
    created () {
      let self = this;
      self.$http.get('http://www.hxhgta.com/cookmenu/topcategory').then((response) => {
        self.list = response.body;
      }, (response) => {
        console.error(response);
      });
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .side-menu {
    @include flexbox;
    @include flex-direction(column);
    z-index: 9999;
    position: absolute;
    left: 0;
    width: 70vw;
    height: 100%;
    background: $menu-bg;
    .header-user {
      color: #bbb;
      padding: 10px 12px;
      font-size: 16px;
      @include flexbox;
      @include justify-content(flex-start);
      @include align-items(center);
      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .user-name {
        padding-left: 20px;
      }
    }
    .header-tool {
      @include flexbox;
      @include justify-content(space-around);
      @include align-items(center);
      padding-right: 30px;
      .tool-block {
        @include flexbox;
        @include flex-direction(column);
        @include justify-content(center);
        @include align-items(center);
        color: #bbb;
        i {
          font-size: 22px;
        }
      }
    }
    .body-list {
      @include flex(1, column);
      color: #bbb;
      padding: 5px 0;
      overflow: scroll;
      .list-wrapper {
        .list-item {
          @include flexbox;
          @include justify-content(space-between);
          @include align-items(center);
          padding: 10px 20px;
          font-size: 16px;
          i {
            font-size: 14px;
            margin-top: -2px;
          }
          &.active {
            background: #131313;
            span, i:first-child {
              color: #fff;
            }
          }
          &.home {
            position: relative;
            span {
              padding-left: 30px;
            }
            i:first-child {
              padding-top: 3px;
              font-size: 22px;
              position: absolute;
            }
          }
        }
      }
    }
  }
</style>
