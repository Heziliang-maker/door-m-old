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
          <div class="item-price">
            <span>
              ${{item.retailPrice.toString().split('.')[0]}}<a>{{item.retailPrice.toString().split('.').length>1?item.retailPrice.toString().split('.')[1]:''}}</a>
            </span>
            <span>{{item.reamt?'$'+(((item.retailPrice*100)-0+(item.reamt*100))/100).toFixed(2):''}}</span>
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
        }
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
        .item-price {
            align-self: flex-start;
            line-height: 17px;
            display: flex;
            & span:first-of-type {
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #de3434;
                margin-right: 7px;
                display: flex;
                align-items: flex-start;
                font-size: 18px;
                font-weight: 600;

                a {
                    margin-left: 2px;
                    font-size: 12px;
                    line-height: 12px;
                }
            }
            & span:last-of-type {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}
</style>
