<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div>
    <van-grid :border="false" :column-num="2" v-if="list.length">
      <van-grid-item v-for="(item,index) in list" :key="index" v-jumpTo=item.productUrl>
        <div class="grid-list-item">
          <div class="item-pic">
            <img :src="item.productImg" alt="">
          </div>
          <div class="item-desc" v-html="item.productName">
          </div>
          <div class="item-price notranslate">
            <div class="current">
              <span class="current-price" v-html="$options.filters.priceGroup(item.retailPrice)"></span>
              <span class="local-price"
                    v-if="rate&&rate!=1&&ccy!=='$'">≈{{ccy}}{{(item.retailPrice*rate).toFixed(2)}}</span>
            </div>
            <!-- <span>
              ${{item.retailPrice.toString().split('.')[0]}}<a>{{item.retailPrice.toString().split('.').length>1?item.retailPrice.toString().split('.')[1]:''}}</a>
            </span> -->
            <span class="origin" v-html="$options.filters.countFix(item.reamt,item.retailPrice)"></span>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        ccy: String,
        rate: String | Number
    }
};
</script>

<style lang="scss" scoped>
.van-grid {
    width: calc(100vw - 18px);
    margin: 0 auto;
    .van-grid-item {
        .item-pic {
            width: 158px;
            height: 158px;
            overflow: hidden;

            margin-bottom: 5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item-desc {
            width: 100%;
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

            margin-bottom: 12px;
        }
        ::v-deep .item-price {
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
