<template>
  <div id="overlay" @click.self="$emit('update:show',false)" class="notranslate">
    <div class="dialog">
      <div class="header">
        <van-icon name="cross" @click.self="$emit('update:show',false)" />
      </div>
      <div class="main-1" v-if="step===1">
        <div class="title">
          $5- $50 cash coupons at branded factory outlets, discounts for the first 500.
        </div>
        <div class="info-total">
          <img src="@/assets/info_total.png" alt="">
        </div>
        <p class="info-deadline">
          The deadline is October 8, 2021
        </p>
        <div class="email-btn">
          <input v-model="email" placeholder="Email Address" type="text" @keyup.enter="handleSubscribe">
        </div>
        <div class="subscribe-btn" @click="handleSubscribe">Subscribe</div>
      </div>
      <div class="main-2" v-else>
        <div class="title">
          Thank you ! Here’s your code :
        </div>
        <div class="list">
          <ul>
            <!-- 1 -->
            <li class="list-item" v-for="(dis,index) in disCountList" :key="index">
              <p class="list-item-desc">{{dis.discountDescribe}}</p>
              <div class="list-item-content">
                <div>
                  {{dis.discountCode}}
                </div>
                <div v-clipboard:copy="dis.discountCode" v-clipboard:success="onCopy" v-clipboard:error="onError">COPY
                </div>
              </div>
            </li>
          </ul>
        </div>
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
            disCountList: []
        };
    },
    async mounted() {
        let { result } = await queryDiscount();
        this.disCountList = result;
    },
    methods: {
        async handleSubscribe() {
            if (this.email) {
                // discountType不传
                let queryData = this.disCountList.map(({ discountType, ...m }) => {
                    return {
                        ...m,
                        emailAddress: this.email
                    };
                });
                let res = await userSubscribe(queryData);
                if (res.status === "success") {
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
// 遮罩层-内容
.dialog {
    width: 336px;
    border-radius: 4px;

    padding-bottom: 50px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    background: url("~@/assets/card_bg.png") no-repeat right;
    background-color: #ffffff;
    background-size: contain;

    .header {
        padding: 12px 0;
        text-align: right;
        .van-icon {
            width: 12px;
            height: 12px;
            margin-right: 20px;
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
                width: 202px;
                height: 104px;
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
            border: 1px solid #d8d8d8;
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
        box-sizing: border-box;
        padding: 0 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .title {
            font-size: 16px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
            color: #333333;
        }
        .list {
            width: 100%;
            box-sizing: border-box;
            padding-top: 30px;
            ul {
                width: 100%;
                padding-bottom: 3px;
                li.list-item {
                    &:not(:last-of-type) {
                        margin-bottom: 20px;
                    }

                    p {
                        font-size: 12px;
                        font-family: Montserrat-Light, Montserrat;
                        font-weight: 300;
                        color: #000000;
                        margin-bottom: 10px;
                    }
                    div.list-item-content {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        & > div {
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                        }
                        & > div:nth-of-type(1) {
                            width: 180px;
                            border: 1px dashed #c1bebe;
                            font-size: 14px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #333333;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        & > div:nth-of-type(2) {
                            width: 86px;
                            background: #162d75;
                            border-radius: 2px;

                            font-size: 14px;
                            font-family: Montserrat-Light, Montserrat;
                            font-weight: 300;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }
}
</style>