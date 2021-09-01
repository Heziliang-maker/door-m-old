<template>
  <van-popup v-model="showComputed" closeable>
    <div class="popup-wrapper">
      <div class="main-1" v-show="step===1">
        <div class="title">
          <p class="title1">Hey , friend ! </p>
          <p class="title2">We've got a gift for you ! Just Subscribe here !!! Limited to the top 20 everyday.</p>
        </div>
        <div class="main1-img">
          <img src="@/assets/gift.png" alt="">
        </div>
        <div class="main1-field">
          <van-form @submit="handleSubscribe">
            <van-field v-model="email" label="" placeholder="Email Address">
              <template #button>
                <!-- <van-button :loading="iconLoading" native-type="submit" loading-type="spinner"
                              @click="handleSubscribe">
                    Subscribe
                  </van-button> -->
                <button type="submit" @click="handleSubscribe">Subscribe</button>
              </template>
            </van-field>
          </van-form>
          <!-- <input v-model="email" placeholder="Email Address" type="text" @keyup.enter="handleSubscribe"> -->
        </div>
        <div class="main1-footer" @click="handleCancel">subscribe later</div>
      </div>
      <transition name="van-slide-right">
        <div class="main-2" v-show="step === 2">
          <div class="title">
            Successfully subscribed ~ !
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
  </van-popup>
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
            step: 1
        };
    },
    computed: {
        showComputed: {
            get() {
                return this.show;
            },
            set(v) {
                this.$emit("update:show", v);
            }
        }
    },
    async mounted() {},
    methods: {
        async handleSubscribe() {
            if (this.email) {
                this.iconLoading = true;
                let res = await userSubscribe(this.email);
                if (res.status === "success") {
                    this.step = 2;
                    this.$toast("Successfully subscribed");
                } else {
                    this.$toast(res.errorMsg);
                }
            } else {
                this.$toast("Fill in your email and subscribe");
            }
        },
        handleCancel() {
            this.$emit("update:show", false);
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

.van-popup {
    width: 308px;
    border-radius: 4px;
    padding-bottom: 22px;
    overflow: visible;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    ::v-deep .van-popup__close-icon {
        color: #444444;
    }
}
.popup-wrapper {
    width: 100%;
    position: relative;
    padding-top: 40px;
}

.main-1 {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .title {
        margin-bottom: 14px;
        padding-left: 20px;
        .title1 {
            font-size: 14px;
            font-family: Montserrat-Regular, Montserrat;
            font-weight: 400;
            color: #333333;
            line-height: 26px;
        }
        .title2 {
            font-size: 12px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
            color: #333333;
            line-height: 14px;
            word-break: keep-all;
        }
    }
    .main1-img {
        position: absolute;
        top: -90px;
        left: -30px;
        img {
            width: 208px;
            height: auto;
        }
    }
    .main1-field {
        width: 100%;
        margin-bottom: 16px;
        .van-cell {
            padding: 0;
        }
        ::v-deep .van-button {
            background-color: #162d75;
            font-size: 10px;
            font-family: Montserrat-Light, Montserrat;
            font-weight: 300;
            color: #ffffff;
        }

        ::v-deep .van-field__body {
            display: flex;
            align-items: center;
            height: 40px;
            border: 1px solid #d8d8d8;
            border-radius: 2px;
            box-sizing: border-box;
            input {
                height: 100%;
                margin-left: 10px;
                font-size: 10px;
                font-family: Montserrat-Light, Montserrat;
                font-weight: 300;
                color: #999999;
                line-height: 39px;
            }
            .van-field__button {
                box-sizing: border-box;
                padding-left: 0;
                height: 100%;
                border-radius: 0px 2px 2px 0px;
                button {
                    height: 100%;
                    width: 70px;
                    font-size: 10px;
                    font-family: Montserrat-Light, Montserrat;
                    font-weight: 300;
                    color: #ffffff;
                    border: none;
                    background: #162d75;
                    border-radius: 0px 2px 2px 0px;
                }
            }

            //
        }
    }
    .main1-footer {
        text-align: center;
        color: #162d75;
        font-size: 12px;
        font-family: Montserrat-Light, Montserrat;
        font-weight: 300;
        color: #162d75;
        line-height: 15px;
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
    align-items: flex-start;
    justify-content: flex-start;

    .title {
        font-size: 14px;
        font-family: Montserrat-Regular, Montserrat;
        font-weight: 400;
        color: #333333;
        line-height: 26px;
        margin-bottom: 10px;
    }
    .info {
        font-size: 12px;
        font-family: Montserrat-Light, Montserrat;
        font-weight: 300;
        color: #333333;
        line-height: 14px;
        word-break: keep-all;
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

                border: 1px solid #f6236c;
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
</style>
/*

  <div id="overlay" @click.self="$emit('update:show',false)" class="notranslate">
    <div class="dialog">
      <div class="dialog-wrapper">
        <div class="header">
          <div>
            <van-icon name="cross" @click.self="$emit('update:show',false)" />
          </div>
        </div>
        <transition name="van-slide-right">
          <div class="main-1" v-show="step===1">
            <div class="title">
              <p class="title1">Hey , friend ! </p>
              <p class="title2">We've got a gift for you ! Just Subscribe here !!! Limited to the top 20 everyday.</p>
            </div>
            <div class="main1-img">
              <img src="@/assets/gift.png" alt="">
            </div>
            <div class="main1-field">
              <van-form @submit="handleSubscribe">
                <van-field v-model="email" label="" placeholder="Email Address">
                  <template #button>
                    <button type="submit" @click="handleSubscribe">Subscribe</button>
                  </template>
                </van-field>
              </van-form>
            </div>
            <div class="main1-footer" @click="handleCancel">subscribe later</div>
          </div>
        </transition>
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

 */