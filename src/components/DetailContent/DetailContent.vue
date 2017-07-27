<template>
  <div class="detail-content">
    <content-header
        :title="getTitle"
        :is-fixed="false"
        :opacity="1"
    >
      <i @click="back" slot="left" class="iconfont header-left-btn">&#xe61b;</i>
      <div slot="right">
        <transition name="add" mode="out-in">
          <i class="iconfont header-right-btn" @click="toggleAdd" v-if="!added" key="add">&#xe607;</i>
          <i class="iconfont header-right-btn" @click="toggleAdd" v-else key="cancel">&#xe64c;</i>
        </transition>
      </div>
    </content-header>
    <section class="content">
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
        <ul class="menu-list">
          <li class="menu-list-item" v-for="(item, index) in list" key="index">
            <img class="item-img" :src="item.albums[0]"/>
            <div class="item-intro">
              <h2 v-text="item.title"></h2>
              <div class="item-ingred">
                <span>材料：</span>
                <p class="ingredients" v-text="item.ingredients"></p>
              </div>
              <div class="item-ingred">
                <span>配料：</span>
                <p class="burden" v-text="item.burden"></p>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </section>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  import ContentHeader from '../ContentHeader/ContentHeader.vue';
  import ContentList from '../ContentList/ContentList.vue';
  import LoadmoreTop from '../LoadMoreTop/LoadMoreTop.vue';
  import { Toast } from 'mint-ui';
  export default {
    name: 'detail-content',
    data () {
      return {
        added: false,
        id: 0,
        pn: 0,
        allLoaded: false,
        translateTop: 0,
        topStatus: '',
        showHeader: false,
        list: []
      }
    },
    computed: {
      getTitle () {
        this.id = this.$route.query.id;
        let self = this;
        this.loadData({
          rn: 10,
          fn: (data) => {
            self.pn = 10;
            self.list = data;
          }
        });
        return this.$route.query.title;
      }
    },
    methods: {
      ...mapActions(['setToggleContent']),
      toggleAdd () {
        this.added = !this.added;
        this.added
          ? Toast({
            message: '添加成功',
            iconClass: 'iconfont icon-zhengque icon-toast',
            duration: 1000
          })
          : Toast({
            message: '取消成功',
            iconClass: 'iconfont icon-cuowu1 icon-toast',
            duration: 1000
          });
      },
      back () {
        this.setToggleContent('out');
        this.$router.back();
        setTimeout(() => {
          this.setToggleContent('in');
        }, 500);
      },
      loadData (options) {
        let self = this;
        let defaultOptions = {
          rn: '',
          pn: '',
          fn: null
        };
        options = this.extend({}, defaultOptions, options);
        self.$http.get('http://www.hxhgta.com/cookmenu/getMenusByCategory/'+this.id+'?rn='+options.rn+'&pn='+options.pn)
            .then((response) => {
              options.fn && options.fn(response.body);
            }, (response) => {
              console.error(response);
            });
      },
      loadTop (id) {
        let self = this;
        this.loadData({
          rn: 10,
          fn: (data) => {
            self.pn = 10;
            self.list = data;
            self.$refs.loadmore.onTopLoaded(id);
          }
        });
      },
      loadBottom (id) {
        // this.allLoaded = true;// 若数据已全部获取完毕
        let self = this;
        this.loadData({
          rn: 10,
          pn: this.pn,
          fn: (data) => {
            self.list = self.list.concat(data);
            self.pn += 10;
            self.$refs.loadmore.onBottomLoaded(id);
          }
        });
      },
      translateChange (val) {
        this.translateTop = val;
      },
      statusChange (val) {
        this.topStatus = val;
      },
      extend (to) {
        for (let i = 1; i < arguments.length; i++) {
          let from = arguments[i];
          for (let key in from) {
            to[key] = from[key];
          }
        }
        return to;
      }
    },
    components: {
      ContentHeader,
      ContentList,
      LoadmoreTop
    }
  }
</script>
<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .detail-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    @include flexbox;
    @include flex-direction(column);
    .content {
      @include flex(1, column);
      overflow: scroll;
      width: 100%;
      .menu-list {
        padding: 5px 10px;
        .menu-list-item {
          @include flexbox;
          @include justify-content(flex-start);
          padding: 7px 0;
          .item-img {
            border-radius: 10px;
            width: 120px;
            height: 120px;
          }
          .item-intro {
            @include flex(1);
            padding: 0 0 0 10px;
            h2 {
              font-size: 18px;
              color: #444;
              line-height: 32px;
            }
            .item-ingred {
              @include flexbox;
              @include justify-content(flex-start);
              padding-top: 1px;
              span {
                width: 43px;
              }
              p {
                @include flex();
                line-height: 22px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                &.ingredients {
                  -webkit-line-clamp: 2;
                }
                &.burden {
                  -webkit-line-clamp: 2;
                }
              }
            }
          }
        }
      }
    }
  }
  .add-leave-active,
  .add-enter-active {
    transition: all .5s ease;
  }
  .add-enter, .add-leave {
    opacity: 0;
  }
  .icon-toast {
    padding: 0 15px;
  }
</style>
