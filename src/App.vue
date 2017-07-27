<template>
  <div class="app">
    <transition name="show-menu">
      <side-menu v-if="!firstLoad" v-show="showMenu" key="sidemenu"></side-menu>
      <!-- <news-content></news-content> -->
    </transition>
    <transition :name="getToggleContent" mode="in-out">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="mask" v-show="showMenu" @click="hideMenu"></div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import SideMenu from './components/SideMenu/SideMenu';
  import NewsContent from './components/NewsContent/NewsContent';

  export default {
    name: 'app',
    data () {
      return {
        firstLoad: true
      }
    },
    computed: {
      ...mapGetters(['showMenu', 'getToggleContent'])
    },
    methods: {
      ...mapActions(['hideMenu'])
    },
    components: {
      SideMenu
    },
    created () {
      let self = this;
      setTimeout(() => {
        self.firstLoad = false;
      }, 300);
    }
  }
</script>

<style lang="scss">
  @import './style/usage/page/var.scss';
  @import './style/usage/page/tools.scss';
  .app {
    position: relative;
    height: 100%;
  }
  .show-menu-enter-active,
  .show-menu-leave-active {
    transition: all .5s ease;
  }
  .show-menu-enter,
  .show-menu-leave-active {
    transform: translate(-70vw, 0);
  }
  .in-enter-active,
  .out-enter-active {
    z-index: 9999;
    transition: all .5s ease;
  }
  .in-enter {
    z-index: 9999;
    transform: translateX(100vw);
  }
  .out-enter {
    z-index: 9999;
    transform: translateX(-100vw);
  }
  .mask {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
</style>
