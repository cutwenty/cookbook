<template>
  <div class="news-content">
    <content-header :title="title" :is-fixed="isFixed" :opacity="headerOpacity">
      <i @click="toggleMenu" slot="left" class="iconfont header-left-btn">&#xe61f;</i>
      <i slot="right" class="iconfont header-left-btn">&#xe64a;</i>
    </content-header>
    <section class="content" @scroll="scroll">
      <mt-loadmore
          class="loadmore"
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :top-loading-text="''"
          ref="loadmore"
          @top-translate-change="translateChange"
          @top-status-change="statusChange"
      >
        <loadmore-top slot="top" :top-status="topStatus" :translate-top="translateTop"></loadmore-top>
        <mt-swipe class="swipe-container" :auto="3000" :speed="500" :showIndicators="true" ref="swipe">
          <mt-swipe-item v-for="banner in banners">
            <img class="swipe-img" :src="banner.albums[0]"/>
            <div class="swipe-footer">
              <span v-text="banner.title"></span>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <recommand></recommand>
        <content-list :show-header="true" :list-data="listData"></content-list>
      </mt-loadmore>
    </section>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  import ContentHeader from '../ContentHeader/ContentHeader.vue';
  import LoadmoreTop from '../LoadMoreTop/LoadMoreTop.vue';
  import ContentList from '../ContentList/ContentList.vue';
  import Recommand from '../Recommand/Recommand.vue';

  export default {
    name: 'news-content',
    data () {
      return {
        title: '首页',
        isFixed: 'true',
        headerOpacity: 0,
        banners: [],
        listData: [],
        allLoaded: false,
        translateTop: 0,
        topStatus: ''
      };
    },
    components: {
      ContentHeader,
      LoadmoreTop,
      ContentList,
      Recommand
    },
    methods: {
      ...mapActions(['toggleMenu']),
      loadTop (id) {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded(id);
        }, 5000);
      },
      loadBottom (id) {
        // this.allLoaded = true;// 若数据已全部获取完毕
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded(id);
        }, 2000);
      },
      scroll () {
        let scrollTop = this.$el.querySelector('.content').scrollTop;
        // banner固定高度
        let opacity = Math.floor(scrollTop / 20) / 10;
        this.headerOpacity = opacity > 1? 1 : opacity;
      },
      translateChange (val) {
        this.translateTop = val;
      },
      statusChange (val) {
        this.topStatus = val;
      }
    },
    created () {
      let self = this;
      self.$http.get('http://www.hxhgta.com/cookmenu/getMenusByCategory/1').then((response) => {
        self.banners = response.body.slice(0, 5);
      }, (response) => {
        console.error(response);
      });
      self.$http.get('http://www.hxhgta.com/cookmenu/getMenusByCategory/2').then((response) => {
        self.listData = response.body;
      }, (response) => {
        console.error(response);
      });
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .header-left-btn {
    font-size: 22px;
  }
  .header-right-btn {
    font-size: 28px;
  }
  .news-content {
    background: #fff;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    .content {
      height: 100%;
      overflow: scroll;
      color: #333;
      .loadmore {
        .swipe-container {
          @media (min-width: 320px) {
            height: 200px;
          }
          @media (min-width: 375px) {
            height: 220px;
          }
          @media (min-width: 414px) {
            height: 250px;
          }
          .swipe-img {
            width: 100%;
            height: 100%;
          }
          .swipe-footer {
            width: 100%;
            height: 40px;
            z-index: 999;
            padding-left: 10px;
            position: absolute;
            bottom: 0;
            background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.5));
            color: #fff;
            line-height: 25px;
            font-size: 18px;
          }
          .mint-swipe-indicators {
            bottom: 0;
            .is-active {
            }
          }
        }
      }
    }
  }
</style>
