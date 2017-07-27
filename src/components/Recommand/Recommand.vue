<template>
  <div class="recommand">
    <div class="recommand-header">
      <div class="recommand-wrapper">
        <i class="iconfont">&#xe63a;</i>
        <span>今日推荐</span>
      </div>
    </div>
    <div class="recommand-cards-wrapper">
      <transition-group
          name="tag"
          mode="out-in"
          appear
          appear-class="before-fade"
          appear-active-class="fade-in"
      >
        <div
            class="recommand-card"
            :class="{'hide': nextingCard && index === 0 || !nextingCard && index !== 0}"
            v-for="(currentCard, index) in cards"
            v-show="!nextingCard && index === 0 || nextingCard && index !== 0"
            key="currentCard.title"
        >
          <div class="card-head">
            <div class="head-left">
              <i class="iconfont">&#xe641;</i>
              <span class="head-tag" v-text="currentCard.tag"></span>
            </div>
            <div class="head-righgt">
              <i class="iconfont" @click="nextCard">&#xe647;</i>
            </div>
          </div>
          <div class="card-body">
            <div class="img-wrapper">
              <img :src="currentCard.albums[0]"/>
            </div>
          </div>
          <div class="card-footer">
            <h2 v-text="currentCard.title"></h2>
            <h3>材料：{{currentCard.ingredients}}</h3>
            <p v-text="currentCard.imtro"></p>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    name: 'recommand',
    data () {
      return {
        cards: [],
        recommandData: [],
        nextingCard: false,
        currentIndex: 0,
        nextIndex: 1
      }
    },
    methods: {
      initCard () {
        if (this.cards.length) {
          setTimeout(() => {
            this.nextingCard
              ? this.cards.splice(0, 1, this.getCard(this.nextIndex))
              : this.cards.splice(1, 1, this.getCard(this.nextIndex));
          }, 500);
          console.log(this.cards)
        } else {
          this.cards.push(this.getCard(this.currentIndex));
          this.recommandData.length !== this.nextIndex && this.cards.push(this.getCard(this.nextIndex));
        }
      },
      getCard (index) {
        let currentCard = this.recommandData[index];
        let tags = currentCard.tags.split(';');
        currentCard.tag = tags[Math.floor(Math.random()*tags.length)];
        return currentCard;
      },
      nextCard () {
        if (this.nextIndex + 1 === this.recommandData.length) {
          // 提示加载新数据
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          // 加载新数据
          this.loadData({
            rn: 6,
            pn: 6,
            fn: (data) => {
              this.currentIndex = -1;
              this.nextIndex = 0;
              setTimeout(() => {
                this.nextingCard = !this.nextingCard;
                Indicator.close();
                this.recommandData = data;
                this.initCard();
              }, 1000);
            }
          });
        } else {
          this.nextingCard = !this.nextingCard;
          this.currentIndex = this.nextIndex;
          this.nextIndex++;
          this.initCard();
        }
      },
      loadData (options) {
        let self = this;
        let defaultOptions = {
          rn: '',
          pn: '',
          fn: null
        };
        options = this.extend({}, defaultOptions, options);
        self.$http.get('http://www.hxhgta.com/cookmenu/getMenusByCategory/2?rn='+options.rn+'&pn='+options.pn).then((response) => {
          options.fn && options.fn(response.body);
        }, (response) => {
          console.error(response);
        });
      },
      extend (to) {
        for (let i = 1; i < arguments.length; i++) {
          let from = arguments[i];
          for (let key in from) {
            from[key] && (to[key] = from[key]);
          }
        }
        return to;
      }
    },
    created () {
      this.loadData({
        rn: 6,
        fn: (data) => {
          this.recommandData = data;
          this.initCard();
        }
      });
    }
  }
</script>

<style lang="scss">
  @import '../../style/usage/page/var.scss';
  @import '../../style/usage/page/tools.scss';
  .recommand {
    background: #fff;
    .recommand-header {
      @include flexbox;
      @include justify-content(center);
      @include align-items(center);
      .recommand-wrapper {
        @include flexbox;
        @include justify-content(center);
        @include align-items(center);
        color: #333;
        font-size: 16px;
        padding: 5px 3px 3px;
        span {
          margin: 0 2px;
        }
        i {
          margin: 0 3px;
        }
        .iconfont {
          font-size: 20px;
          color: #ef473a;
        }
      }
    }
    .recommand-cards-wrapper {
      position: relative;
      background: #ebebeb;
      padding: 13px 5%;
      box-shadow: 0 1px 5px #999 inset;
      @media (min-width: 320px) {
        height: 332px;
      }
      @media (min-width: 375px) {
        height: 384px;
      }
      @media (min-width: 414px) {
        height: 427px;
      }
      .recommand-card {
        z-index: 0;
        background: #fff;
        width: 90vw;
        border-radius: 10px;
        box-shadow: 0 0 10px #999;
        position: relative;
        &.hide {
          position: absolute;
        }
        .card-head {
          @include flexbox;
          @include justify-content(space-between);
          @include align-items(center);
          padding: 6px 10px;
          .head-left {
            .head-tag {
              padding-left: 3px;
              font-size: 15px;
            }
          }
        }
        .card-body {
          @include flexbox;
          @include justify-content(center);
          padding: 0 10px;
          .img-wrapper {
            width: 60%;
            img {
              width: 100%;
              border-radius: 10px;
            }
          }
        }
        .card-footer {
          padding: 10px 15px;
          h2 {
            line-height: 26px;
            font-size: 16px;
          }
          h3 {
            line-height: 22px;
            text-indent: 1.5em;
            @media (min-width: 320px) {
              @include ellipsis;
            }
          }
          p {
            line-height: 22px;
            text-indent: 1.5em;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            @media (min-width: 320px) {
              height: 41px;
              -webkit-line-clamp: 2;
            }
            @media (min-width: 375px) {
              height: 63px;
              -webkit-line-clamp: 3;
            }
            @media (min-width: 414px) {
              height: 85px;
              -webkit-line-clamp: 4;
            }
          }
        }
      }
    }
    .tag-move {
      transition: all .5s ease;
    }
    .tag-enter-active,
    .tag-leave-active {
      transition: all .5s ease;
    }
    .tag-enter,
    .tag-leave-active {
      transform: translateX(100vw);
    }
    .before-fade {
      opacity: 0;
    }
    .fade-in {
      opacity: 1;
    }
  }
</style>
