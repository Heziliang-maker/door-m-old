<template>
  <div id="app">
    <div class="layout-header">
      <Header />
    </div>
    <div class="layout-main ">
      <router-view :rate='rate' :ccy='ccy' :show.sync="showCard" @ready="ready" />
    </div>
    <div class="layout-footer notranslate" v-if="isReady">
      <Footer />
    </div>
    <transition name="van-fade">
      <Overlay v-if="showCard" :show.sync="showCard" />

    </transition>
    <transition name="van-fade">
      <div v-show="isProductPage" ref="btnForDiscount" class="discount_btn" @click="handleGetDiscount"><img
             src="@/assets/discount_btn.png" alt="discount"></div>
    </transition>
  </div>
</template>
<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Overlay from "@/components/Overlay";
import cookie from "@/plugins/cookie";
import axios from "axios";

import { queryLanguage, queryLocalLanguage } from "@/api";
window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement(
        {
            //pageLanguage: 'zh-CN',
            //这个是你需要翻译的语言，比如你只需要翻译成越南和英语，这里就只写en,vi
            // pageLanguage: 'zh-CN',
            includedLanguages: "en,zh-CN,hr,cs,da,nl,fr,de,el,hu,ga,it,ja,ko,pt,ro,ru,sr,es,th",
            //选择语言的样式
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            //自动显示翻译横幅，就是翻译后顶部出现的那个
            autoDisplay: false
            //还有些其他参数，由于原插件不再维护，找不到详细api了，将就了，实在不行直接上dom操作
        },
        "google_translate_element" //触发按钮的id
    );
};
export default {
    components: {
        Header,
        Footer,
        Overlay
    },
    data() {
        return {
            isReady: false,
            showCard: false,
            // 货币符号
            // ccy: "",
            ccy: "€",
            // 汇率
            rate: 1.2,
            // 更改前的语言
            originLang: ""
        };
    },
    computed: {
        isProductPage() {
            const { path } = this.$route;
            const routeFilter = ["/home", "/more"];
            return routeFilter.includes(path);
        }
    },
    mounted() {
        // 获取语言和汇率以及货币符号
        this.getCounryInfo();
        // 轮询
        setInterval(async () => {
            // cookie中当前的语言
            let cookieLang = cookie.get("googtrans");
            if (this.originLang !== cookieLang) {
                //触发语言切换
                await this.handleSelectLang(cookieLang);
                // 替换
                this.originLang = cookieLang;
            }
        }, 500);
    },
    methods: {
        ready(isReady) {
            this.isReady = isReady;
        },
        async handleSelectLang(cookieLang) {
            let res = await queryLanguage(cookieLang.split("/")[2]);
            if (res.status === "success") {
                // 重置
                this.ccy = res.result.ccySymbol;
                console.log("货币符号是=>", this.ccy);
                this.rate = res.result.rate;
            } else {
                this.$toast(res.errorMsg);
            }
        },
        async getCounryInfo() {
            // 获取ip对应的countryCode
            let { data } = await axios.get("http://ip-api.com/json");
            // 获取countryCode对应的国家的汇率和货币符号 语言
            let myLocalInfo = await queryLocalLanguage(data.countryCode);
            //根据语言 setCookie => 对插件进行默认设置
            cookie.set("googtrans", "/auto/" + myLocalInfo.result.language);
            //根据货币 汇率 渲染格式化
            this.Translate(myLocalInfo.result.language);
        },
        async handleSubscribe() {
            if (this.email) {
                let value = await queryDiscount();
                console.log("=>", "value");
                this.step = 2;
            } else {
                this.$toast("Fill in your email and subscribe");
            }
        },
        handleGetDiscount() {
            this.showCard = true;
        }
    }
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #ffffff;
}
.layout-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: #fff;
}
.layout-main {
    margin-top: 51px;
}
.layout-footer {
    //
}

.van-tabs {
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;

    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;

    .van-tab {
        flex: 0 0 110px !important;
        word-break: keep-all;
        padding: 0 !important;
        text-align: center;
    }
}
// 遮罩层
.van-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}
.discount_btn {
    position: fixed;
    right: 21px;
    bottom: 29px;
    transition: opacity 0.4s linear;
    transition-delay: 0.3s;
    z-index: 99;
    img {
        width: 77px;
        height: 77px;
    }
}
</style>
