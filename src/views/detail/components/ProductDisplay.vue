<!--
 * @Date: 2021-11-08
 * @Description: 
-->
<template>
  <div class="product">
    <!-- 商品大图 -->
    <div
      class="product-main"
      v-if="images && images.length > 0"
    >
      <div
        class="product-main-icon"
        v-if="!!dataSource.video && !isView"
      >
        <!-- 视频播放按钮 -->
        <img
          v-show="!!dataSource.video && !isView"
          src="@/assets/bofang.png"
          alt="播放该视频"
          @click.stop="handleClickVideoPlayIcon"
        >
        <!-- <van-icon
          name="play-circle-o"
          size="50"
          color="#f6f6f5"
          @click="handleClickVideoPlayIcon"
        /> -->
      </div>
      <transition name="van-fade">
        <div
          class="product-main-player"
          v-if="!!dataSource.video && isView"
        >
          <!-- 视频 -->
          <video
            ref="video"
            controls
            :src="dataSource.video"
            :poster="dataSource.videoCover"
            preload="auto"
          />
          <!-- @click="handleClickVideo" -->
          <!-- 视频关闭icon -->
          <van-icon
            class="product-main-player__close"
            size="14"
            name="cross"
            @click="isView = false"
          />
        </div>
      </transition>
      <!-- 商品主图列表 -->
      <van-swipe
        class="myswipe"
        indicator-color="white"
        ref="mySwiper"
        @change="onSwiperChange"
      >
        <van-swipe-item
          v-for="item in images"
          :key="item.url"
        >
          <van-image
            class="main-img"
            fit="contain"
            :src="item.url"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品下部滚动列表 -->
    <div class="product-slide">
      <div
        class="wrapper"
        ref="wrapperRef"
      >
        <div class="group-img">
          <template v-for="(item, index) in images">
            <div
              class="img-box"
              :class="{ 'img-box-check': curMainImageIndex == index }"
              :style="{
                    backgroundImage: 'url(' + item.url + ')',
                  }"
              @click="changeImage(index)"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <!-- 商品名称 -->
    <div class="product-name">{{ dataSource.name }}</div>
    <!-- 商品评分 -->
    <Score
      v-show="!!dataSource.star"
      class="product-score"
      v-model="dataSource.star"
      :size="14"
      readonly
    />
    <!-- 商品价格 -->
    <div class="product-price">
      <div class="nowPrice">
        <a
          v-if="dataSource.retailPrice "
          class="store-price"
        >{{ dataSource.retailPrice + "" + dataSource.ccy }}</a>
        <!-- <a class="local-price">{{ $translatePriceRate(nowPrice) }}</a> -->
      </div>
      <a
        class="original"
        v-if="dataSource.originalPrice"
      >
        {{ dataSource.originalPrice + "" + dataSource.ccy }}
        <!-- {{ $translatePriceRate(originalPrice) }} -->
      </a>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Score from "@/components/Score.vue";
export default {
    name: "ProductDisplay",
    props: {
        dataSource: {
            type: Object,
            required: true
        }
    },
    components: {
        Score
    },
    data() {
        return {
            bs: null,
            curMainImageIndex: 0,
            isView: false
        };
    },
    computed: {
        images() {
            return this.dataSource.pics;
        }
    },
    mounted() {
        this.bs = new BScroll(".wrapper", {
            scrollX: true,
            probeType: 3,
            bounce: true,
            eventPassthrough: "vertical"
        });
    },
    beforeDestroy() {
        this.bs.destroy();
    },
    methods: {
        onSwiperChange(index) {
            this.curMainImageIndex = index;
            // this.bs.refresh();
            // this.bs.scrollTo(index);
        },
        changeImage(index) {
            this.curMainImageIndex = index;
            this.$refs.mySwiper.swipeTo(index);
        },
        handleClickVideoPlayIcon() {
            this.isView = true;
            this.$nextTick(() => {
                const videoPlayer = this.$refs.video;
                videoPlayer.play();
                videoPlayer.onended = () => {
                    this.isView = false;
                    console.log("=>", "视频结束");
                };
            });
        },
        handleClickVideo() {
            const videoPlayer = this.$refs.video;
            const paused = videoPlayer.paused;
            if (paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
ul,
li,
div,
p,
img {
    // outline: 1px solid #00cec9;
}
.product {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    padding-bottom: 0;
    .product-main {
        width: 346px;
        margin-bottom: 12px;
        position: relative;
        // 悬浮视频播放按钮
        .product-main-icon {
            position: absolute;
            width: fit-content;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10%;
            z-index: 99;
            > img {
                width: 46px;
                height: 46px;
            }
        }
        .main-img {
            width: calc(10rem - 28px);
            height: calc(10rem - 28px);
            ::v-deep > img {
                width: 100%;
                height: 100%;
            }
        }
        // 悬浮视频控件
        .product-main-player {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            // background-color: red;
            z-index: 99;
            // 播放icon
            > video {
                width: 100%;
                height: 100%;
                background-color: #000;
                object-fit: contain;
                // height: 100vh;
            }

            &__close {
                position: absolute;
                // topposition: absolute;
                right: 15px;
                top: 15px;

                z-index: 99;
                color: #fff;
            }
        }
    }
    .product-slide {
        width: 100%;
        .wrapper {
            position: relative;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            .group-img {
                display: inline-block;
                .img-box {
                    display: inline-block;
                    width: 78px;
                    min-width: 78px;
                    height: 78px;
                    background-position: center;
                    background-size: cover;
                    margin-right: 12px;
                    border-radius: 2px;
                    border: 1px #fff solid;
                }
                .img-box-check {
                    border: 1px #d8d8d8 solid;
                }
            }
        }
    }
    .product-name {
        margin: 14px 0 10px;
        font-size: 16px;
        font-family: Montserrat-Light, Montserrat;
        font-weight: 300;
        color: #111111;
        line-height: 19px;
        align-self: flex-start;
    }
    .product-score {
        align-self: flex-start;
    }
    .product-price {
        align-self: flex-start;
        // margin-bottom: 30px;
        .nowPrice {
            .store-price {
                font-size: 18px;
                font-weight: 300;
                color: #cb0000;
                line-height: 20px;
                margin-right: 10px;
            }
            .local-price {
                font-size: 12px;
                font-weight: 300;
                color: #111111;
                line-height: 15px;
            }
        }
        .original {
            font-size: 14px;
            font-weight: 300;
            color: #999;
            line-height: 18px;
            text-decoration: line-through;
        }
    }
}
</style>