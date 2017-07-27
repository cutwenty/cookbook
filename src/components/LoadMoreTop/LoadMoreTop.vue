<template>
  <div class="mint-loadmore-top" :style="{'transform': 'translate3d(0, ' + translateTop + 'px, 0)'}">
    <div class="top-content" :style="{'transform': 'scale('+scale+')'}">
      <clip-loader class="loader" v-show="topStatus === 'loading'" :size="spinnerSize" :color="spinnerColor" ></clip-loader>
      <div v-show="topStatus !== 'loading'" class="progress"></div>
    </div>
  </div>
</template>

<script>
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import ProgressBar from 'progressbar.js';

  export default {
    name: 'loadmore-top',
    props: ['translateTop', 'topStatus'],
    data () {
      return {
        scale: 0,
        bar: null,
        spinnerSize: '24px',
        spinnerColor: '#387ef5'
      }
    },
    watch: {
      translateTop (val) {
        let scale = val / 50;
        this.scale = scale > 1
          ? 1
          : scale;
        this.bar.set(this.scale);
      }
    },
    components: {
      ClipLoader
    },
    mounted () {
      this.bar = new ProgressBar.Circle('.progress', {
        easing: 'easeInOut',
        strokeWidth: 8,
        color: '#387ef5'
      });
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .mint-loadmore-top {
    height: 44px;
    width: 100%;
    position: absolute;
    top: 44px;
    @include flexbox;
    @include align-items(center);
    @include justify-content(center);
    .top-content {
      @include flexbox;
      @include justify-content(center);
      @include align-items(center);
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 13px 0 rgba(0, 0, 0, 0.24);
      .loader {
        @include flexbox;
        @include align-items(center);
        @include justify-content(center);
        height: auto;
      }
      .progress {
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
