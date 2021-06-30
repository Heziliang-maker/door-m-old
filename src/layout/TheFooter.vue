<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div class="footer">
    <div class="footer-top">
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item ref="collapse" v-for=" (item,index) in collTextList" :key="item.title" :title="item.title"
                           :name="index">
          <template slot:value>
            <p v-for="sitem in item.content" :key="item.label" @click="handleClickFoot(sitem.path)">{{sitem.label}}</p>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="footer-bot">
      <div class="footer-bot-logo" @click="$router.push('/home')">
        <img src="@/assets/foot-logo.png" alt="">
      </div>
      <p class="footer-bot-copyright">
        © 2021 I Midnight Sad Rose Limited All Rights Reserved I Be a visionary I Powered by Buykop
      </p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ["1"],
            collTextList: [
                {
                    title: "Law and Compliance",
                    content: [
                        {
                            label: "Terms of Service",
                            path: "/terms"
                        },
                        {
                            label: "Privacy Policy",
                            path: "/privacy"
                        }
                    ]
                },
                {
                    title: "Formularay",
                    content: [
                        {
                            label: "About Us",
                            path: "/about"
                        }
                    ]
                },
                {
                    title: "Contact Us",
                    content: [
                        {
                            label: "Tel：+86-21-58358578"
                        },
                        {
                            label: "E-mail：service@buykop.com"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleClickFoot(path) {
            if (path) {
                this.$router.push(path);
                this.activeNames = [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    background: #162d75;
    margin-top: 20px;
    // margin-bottom: 34px;
    width: 100%;
    &-top {
        ::v-deep .van-collapse {
            .van-cell {
                background: #162d75;
                .van-cell__title {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                    background: #162d75;
                }
                .van-cell__right-icon {
                    color: #ffffff;
                }
            }
            .van-collapse-item__content {
                padding-top: 17px;
                padding-bottom: 17px;
                background: #162d75;
                p {
                    font-size: 10px;
                    line-height: 17px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                }
                & > p:first-of-type {
                    margin-bottom: 10px;
                }
            }
            .van-cell::after {
                // background: #162d75;
                border-bottom: 1px solid #344c97;
            }
            .van-collapse-item--border::after {
                border-top: 1px solid #344c97;
            }
        }
    }
    &-bot {
        width: calc(100% - 32px);
        box-sizing: border-box;
        padding: 27px 0 42px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid #344c97;

        &-logo {
            height: 30px;
            margin-bottom: 10px;
            img {
                height: 100%;
            }
        }
        &-copyright {
            word-break: keep-all;
            width: 255px;
            text-align: center;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 18px;
        }
    }
}
</style>
