<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
    <div class="slide">

        <div class="probox">
            <!-- item -->
            <div class="proitem clicks" v-for="(item,index) in list" :key="index" v-jumpTo=item.productUrl>
                <div class="proitem-top">
                    <img :src="item.productImg[0]" alt="">
                </div>
                <div class="proitem-bot">
                    <div :style="{backgroundImage:'url('+item.productImg[1]+')'}" class="coverimg"></div>
                    <div :style="{backgroundImage:'url('+item.productImg[2]+')'}" class="coverimg"></div>
                    <div :style="{backgroundImage:'url('+item.productImg[3]+')'}" class="coverimg"></div>
                </div>
                <div class="proitem-foot" v-html="item.productName">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    computed: {
        // imgObj() {
        //     const {productImg} = this.list
        //     return this.data
        // }
    }
};
</script>

<style lang="scss" scoped>
.slide {
    // 隐藏滚动条
    & ::-webkit-scrollbar {
        display: none;
    }
    .probox {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
        box-sizing: border-box;
        // overflow: auto;
        overflow-x: scroll;
        overflow-y: hidden;
        // &-wapper {
        //     width: 100%;
        // }

        // ..
        .proitem {
            flex: 0 0 116px;
            margin-right: 15px;

            &:first-of-type {
                margin-left: 19px;
            }

            &-top {
                width: 100%;
                height: 116px;
                overflow: hidden;
                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
            &-bot {
                flex-basis: 100%;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 6px;

                & > div {
                    flex: 1;
                    height: 38px;
                    overflow: hidden;
                    margin-right: 1px;
                    margin-top: 1px;
                }
                & > div:last-of-type {
                    margin-right: 0;
                }
            }

            &-foot {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 17px;
            }
        }
    }
}
</style>
