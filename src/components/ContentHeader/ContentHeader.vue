<template>
  <header class="content-header" :class="{fixed: isFixed}" :style="{background: background}">
    <div class="header-left header-btns">
      <slot name="left"></slot>
    </div>
    <h1 class="header-title">{{title}}</h1>
    <div class="header-right header-btns">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'content-header',
    props: ['title', 'isFixed', 'opacity'],
    data () {
      return {
      };
    },
    computed: {
      background () {
        return 'rgba(255,255,255,'+this.opacity+')';
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .content-header {
    @include flexbox;
    height: 44px;
    background: $plain;
    color: #888;
    padding: 0 10px;
    &.fixed {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
    }
    .header-title {
      @include flex;
      font-size: 18px;
      line-height: 44px;
      text-align: center;
    }
    .header-btns {
      @include flex;
      @include flexbox;
      @include align-items(center);
      &.header-left {
        @include justify-content(flex-start);
      }
      &.header-right {
        @include justify-content(flex-end);
      }
    }
  }
</style>
