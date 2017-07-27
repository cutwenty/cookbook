<template>
  <div class="menu-content">
    <content-header
        :title="getSubMenuId.name"
        :is-fixed="isFixed"
        :opacity="headerOpacity"
    >
      <i @click="toggleMenu" slot="left" class="iconfont header-left-btn">&#xe61f;</i>
      <i @click="home" slot="right" class="iconfont header-right-btn">&#xe623;</i>
    </content-header>
    <div class="list-wrapper">
      <ul
          class="menu-content-list"
          v-infinite-scroll=""
          infinite-scroll-disabled="true"
      >
        <transition-group name="menu-tag">
          <li
              class="menu-content-item"
              v-for="(item, index) in list"
              key="item.name"
              @click="goDetail(index)"
          >
            <img class="item-img" :src="item.albums[0]"/>
            <div class="item-name">
              <span v-text="item.name"></span>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import ContentHeader from '../ContentHeader/ContentHeader.vue';
  export default {
    name: 'menu-content',
    data () {
      return {
        isFixed: false,
        headerOpacity: 1,
        list: []
      };
    },
    computed: {
      ...mapGetters(['getSubMenuId'])
    },
    methods: {
      ...mapActions(['toggleMenu']),
      home () {
        this.$router.push({path: '/'});
      },
      loadData (id) {
        let self = this;
        self.$http.get('http://www.hxhgta.com/cookmenu/secondcategory/'+id).then((response) => {
          self.list = response.body;
        }, (response) => {
          console.error(response);
        });
      },
      goDetail (index) {
        let item = this.list[index];
        this.$router.push({path: '/detail?id='+item.id+'&title='+item.name});
      }
    },
    watch: {
      'getSubMenuId.id': function (id) {
        this.loadData(id);
      }
    },
    components: {
      ContentHeader
    },
    created () {
      this.loadData(this.getSubMenuId.id);
    }

  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .menu-content {
    @include flexbox;
    @include flex-direction(column);
    background: #fff;
    width: 100%;
    position: absolute;
    height: 100%;
    .header-left-btn {
      font-size: 22px;
    }
    .list-wrapper {
      @include flex(1, column);
      overflow: scroll;
      .menu-content-list {
        padding: 0 20px 10px;
        .menu-content-item {
          position: relative;
          padding-top: 10px;
          .item-img {
            width: 100%;
            height: 45vw;
            border-radius: 10px;
          }
          .item-name {
            padding: 5px 15px;
            position: absolute;
            bottom: 0;
            width: 100%;
            background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.7));
            color: #fff;
            height: 15vw;
            border-radius: 0 0 10px 10px;
            text-align: right;
            @media (min-width: 320px) {
              font-size: 20px;
            }
            @media (min-width: 375px) {
              font-size: 22px;
            }
            @media (min-width: 414px) {
              font-size: 26px;
            }
          }
        }
      }
    }
  }
  .menu-tag-move {
    transition: all .5s ease;
  }
</style>
