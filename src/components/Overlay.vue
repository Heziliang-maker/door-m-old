<template>
  <div id="overlay" @click.self="$emit('update:show',false)" class="notranslate">
    <div class="dialog">
      <div class="dialog-wrapper">

        <div class="header">
          <div>
            <van-icon name="cross" @click.self="$emit('update:show',false)" />
          </div>
        </div>
        <div class="main-1" v-show="step===1">
          <div class="title">
            <p>Hey , friend ! </p>
            <p>We've got a gift for you ! Just Subscribe here !!!</p>
            <p>Limited to the top 20 everyday.</p>
          </div>
          <div class="info-total">
            <img src="@/assets/info_total.png" alt="">
          </div>
          <div class="email-btn">
            <input v-model="email" placeholder="Email Address" type="text" @keyup.enter="handleSubscribe">
          </div>
          <van-button class="subscribe-btn" :loading="iconLoading" type="primary" loading-type="spinner"
                      @click="handleSubscribe">
            Subscribe
          </van-button>
          <!-- <div class="subscribe-btn" @click="handleSubscribe">Subscribe</div> -->
        </div>
        <transition name="van-slide-right">

          <div class="main-2" v-show="step === 2">
            <div class="title">
              Successfully subscribed ~
            </div>
            <p class="info">You will receive special offers and the first opportunity to obtain new products!</p>
            <p class="info">Please leave a note about the gift you want on your order page.</p>
            <div class="list">
              <ul>
                <!-- 1 -->
                <li class="list-item">
                  <div class="list-item-main">
                    <img src="@/assets/gift1.png" alt="">
                  </div>

                  <div class="list-item-tag">Fishnet Bodystocking</div>
                </li>
                <li class="list-item">
                  <div class="list-item-main">
                    <img src="@/assets/gift2.png" alt="">
                  </div>
                  <div class="list-item-tag">Portable Fan</div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDiscount, userSubscribe } from "@/api";
export default {
    name: "Overlay",
    props: {
        show: {
            type: Boolean
        }
    },
    data() {
        return {
            email: "",
            step: 1,
            iconLoading: false
        };
    },
    async mounted() {},
    methods: {
        async handleSubscribe() {
            if (this.email) {
                // discountType不传
                // let queryData = this.disCountList.map(({ discountType, ...m }) => {
                //     return {
                //         ...m,
                //         emailAddress: this.email
                //     };
                // });
                this.iconLoading = true;
                let res = await userSubscribe(this.email);
                if (res.status === "success") {
                    this.iconLoading = false;
                    this.$toast("Successfully subscribed");
                    this.step = 2;
                } else {
                    this.$toast(res.errorMsg);
                }
            } else {
                this.$toast("Fill in your email and subscribe");
            }
        },

        onCopy() {
            this.$toast("Successfully copied");
        },
        onError() {
            this.$toast("Error,please try again");
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
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}
.dialog {
    position: relative;
    width: 336px;
    height: 445px;
}
// 遮罩层-内容
.dialog-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    padding-bottom: 50px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    background: url("~@/assets/card_bg.png") no-repeat right;
    background-color: #ffffff;
    background-size: contain;
    padding-top: 40px;

    .header {
        position: absolute;
        top: 12px;
        width: 100%;

        box-sizing: border-box;
        text-align: right;

        > div {
            font-size: 0;
            margin-right: 12px;
        }
        .van-icon {
            font-size: 16px;
        }
        .van-icon::before {
            // width: 12px;
            // height: 12px;
            // margin-right: 12px;
        }
    }
    .main-1 {
        width: 100%;
        box-sizing: border-box;
        padding: 0 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .title {
            font-size: 16px;
            font-family: Montserrat-Regular, Montserrat;
            font-weight: 400;
            color: #333333;
            line-height: 26px;
            text-align: center;
            margin-bottom: 19px;
        }
        .info-total {
            img {
                width: 336px;
                height: auto;
            }
        }
        .info-deadline {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
            margin: 10px 0 30px;
        }
        .email-btn,
        .subscribe-btn {
            height: 40px;
            border-radius: 2px;
            line-height: 40px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
        }
        .email-btn {
            width: 100%;
            border: 1Px solid #d8d8d8;
            font-size: 16px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
            color: #999999;
            margin-bottom: 14px;
            padding: 0 19px;
            box-sizing: border-box;
            input {
                // reset
                display: block;
                box-sizing: border-box;
                width: 100%;
                min-width: 0;
                margin: 0;
                padding: 0;
                color: #323233;
                line-height: inherit;
                text-align: left;
                background-color: transparent;
                border: 0;
                resize: none;
            }
        }
        .subscribe-btn {
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #ffffff;
            background: #162d75;
        }
    }
    .main-2 {
        width: 100%;
        max-height: 380px;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .title {
            font-size: 16px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 400;
            color: #333333;
            margin-bottom: 10px;
        }
        .info {
            font-size: 12px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
            color: #333333;
            line-height: 18px;
            text-align: center;
        }
        .list {
            width: 100%;
            box-sizing: border-box;
            padding-top: 30px;
            ul {
                width: 100%;
                padding-bottom: 3px;
                li.list-item {
                    margin: auto;
                    &:not(:last-of-type) {
                        margin-bottom: 10px;
                    }
                    position: relative;
                    width: 180px;
                    border-radius: 1px;

                    border: 1Px solid #f6236c;
                    box-sizing: border-box;
                    font-size: 0;
                    .list-item-main {
                        padding: 24px 17px 0;

                        img {
                            width: 100%;
                        }
                    }
                    .list-item-tag {
                        width: 100%;
                        height: 24px;
                        margin-top: 24px;
                        background-color: #f6236c;
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #ffffff;
                        line-height: 24px;
                        text-align: center;
                    }
                    &::after {
                        content: "";
                        display: block;
                        position: absolute;
                        width: 52px;
                        height: 52px;
                        background-image: url("~@/assets/triangle.png");
                        background-size: 100% 100%;
                        background-position: 0 0;
                        top: 0;
                        right: 0;
                    }
                    &::before {
                        display: block;
                        position: absolute;
                        right: 2px;
                        top: 4px;
                        z-index: 9;
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 17px;
                    }
                }
                li.list-item:nth-of-type(1)::before {
                    content: "gift1";
                }
                li.list-item:nth-of-type(2)::before {
                    content: "gift2";
                }
            }
        }
    }
}
</style>