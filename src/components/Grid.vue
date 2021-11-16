<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div>
    <van-grid
      :center="false"
      :border="false"
      :column-num="2"
    >
      <!--   productId:item.productId,shopId:item.shopId -->
      <van-grid-item
        v-for="(item,index) in list"
        :key="item.productUrl"
        :ref="'gridItem'+index"
        v-jumpTo="{url:item.productUrl,type:2,id:item.id,shopId:item.shopId,
        detailQuery:{
          productId:item.productId,
          shopId:item.shopId
        }
        }"
      >
        <div class="grid-list-item">
          <div class="item-pic">
            <!-- 视频播放按钮 -->
            <!-- <iframe  src="@/assets/bofang.svg" width="30" height="30" frameborder="0"></iframe> -->
            <img
              v-show="!!item.video && !item.isView"
              class="item-pic-play"
              src="@/assets/bofang.png"
              alt="播放该视频"
              @click.stop="handleClickVideoPlayIcon(index,item.productUrl)"
            >
            <!-- <van-icon
              v-show="!!item.video && !isView"
              class="item-pic-play"
              name="play-circle-o"
              size="30"
              color="#f6f6f5"
              @click.stop.native="handleClickVideoPlayIcon(index)"
            /> -->
            <transition name="van-fade">
              <div
                class="item-pic-player"
                v-show="!!item.video && item.isView"
              >
                <!-- 视频 -->
                <video
                  :ref="'video'+index"
                  :src="item.video"
                  :poster="item.videoCover"
                  muted
                  playsinline
                  webkit-playsinline
                  preload="auto"
                />
                <!-- 视频关闭icon -->
                <van-icon
                  class="item-pic-player__close"
                  size="14"
                  name="cross"
                  @click.stop.native="item.isView = false"
                />
              </div>
            </transition>
            <van-image
              class="van-img"
              :width="158"
              :height="158"
              :src="item.productImg"
              fit="contain"
              lazy-load
            >
              <template v-slot:loading>
                <van-loading
                  type="spinner"
                  size="20"
                />
              </template>
            </van-image>
            <!-- <img :src="item.productImg" alt=""> -->
          </div>
          <div
            class="item-desc"
            v-html="item.productName"
          >
          </div>
          <Score
            class="item-star"
            v-if="!!item.starLevel"
            v-model="item.starLevel"
            :size="14"
            readonly
          />
          <div
            v-else
            class="item-gap"
          ></div>
          <div class="item-price notranslate">
            <div class="current">
              <span
                class="current-price"
                v-html="$options.filters.priceGroup(item.retailPrice)"
              ></span>
              <span
                class="local-price"
                v-if="rate&&rate!=1&&ccy!=='$'"
              >≈{{ccy}}
                {{(item.retailPrice*rate).toFixed(2)}}</span>
            </div>
            <!-- <span>
              ${{item.retailPrice.toString().split('.')[0]}}<a>{{item.retailPrice.toString().split('.').length>1?item.retailPrice.toString().split('.')[1]:''}}</a>
            </span> -->
            <span
              class="origin"
              v-html="$options.filters.countFix(item.reamt)"
            ></span>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Score from "./Score.vue";
export default {
    name: "Grid",
    components: {
        Score
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        ccy: String,
        rate: String | Number
    },
    methods: {
        handleClickVideoPlayIcon(index, productUrl) {
            // this.isView = true;
            this.$emit("update", productUrl);

            this.$nextTick(() => {
                const videoPlayer = this.$refs[`video${index}`][0];

                videoPlayer.play();
                videoPlayer.onended = () => {
                    this.$emit("update", productUrl);
                };
            });
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
.van-grid {
    width: calc(100vw - 18px);
    margin: 0 auto;
    .van-grid-item {
        width: 50%;
        flex-grow: 0;
        overflow: hidden;
        .item-pic {
            overflow: hidden;
            margin-bottom: 5px;

            ::v-deep {
                .van-img > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .item-desc {
            flex: 0 0 158px;
            box-sizing: border-box;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 17px;
        }
        .item-gap {
            height: 6px;
        }
        .item-star {
            // margin-bottom: 8px;
        }
        .item-pic {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            .item-pic-play {
                position: absolute;
                width: fit-content;
                right: 15%;
                bottom: 10%;
                z-index: 99;
                width: 36px;
                height: 36px;
            }
            // 悬浮视频控件
            .item-pic-player {
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
        ::v-deep .item-price {
            // margin-top: 6px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            & .current {
                display: flex;
                // font-size: 14px;
                // font-family: PingFangSC-Semibold, PingFang SC;
                // font-weight: 600;
                // color: #de3434;
                // margin-right: 7px;
                // display: flex;
                // align-items: flex-start;
                // font-size: 18px;
                // font-weight: 600;

                // a {
                //     margin-left: 2px;
                //     font-size: 12px;
                //     line-height: 12px;
                // }
                flex: 3;
                .current-price {
                    display: flex;
                    align-items: flex-start;
                    font-size: 18px;
                    font-weight: 600;
                    color: #de3434;
                    line-height: 17px;
                    // margin-right: 7px;
                    a {
                        margin-left: 2px;
                        font-size: 12px;
                        line-height: 12px;
                    }
                }

                .local-price {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    margin-left: 5px;
                }
            }
            & .origin {
                flex: 1;
                text-decoration: line-through;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}
</style>
