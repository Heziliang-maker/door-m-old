<!--
 * @Date: 2021-12-02
 * @Description: 
-->
// TODO: mobile 首页重构
// TODO: vant样式自定义

<template>
  <div id="page">
    <div class="layout-header">
      <van-sticky>
        <Nav />
      </van-sticky>
    </div>
    <div class="layout-main ">
      <router-view
        :rate='rate'
        :ccy='ccy'
        :show.sync="showCard"
        @ready="ready"
      />
    </div>
    <div
      class="layout-footer notranslate"
      v-if="isReady"
    >
      <Footer />
    </div>
    <!-- <transition name="van-fade">
      <Overlay
        :key="overlayKey"
        :show.sync="showCard"
      />
    </transition> -->
    <!-- <transition name="van-slide-right">
      <div
        v-show="isReady && isProductPage"
        ref="btnForDiscount"
        class="discount_btn"
        @click="handleGetDiscount"
      ><img
          src="@/assets/dialog_btn.png"
          alt="discount"
        ></div>
    </transition> -->
  </div>
</template>

<script>
import Nav from "@/layout/TheNav";
import Footer from "@/layout/TheFooter";
import Overlay from "@/components/Overlay";
import cookie from "@/plugins/cookie";
import { queryLanguage, queryLocalLanguage } from "@/api";
import { trackViewBehavior } from "@/api/index";

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
        Nav,
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
            originLang: "",
            overlayKey: 1,
            loading: false,
            timer: null
        };
    },
    computed: {
        isProductPage() {
            const { path } = this.$route;
            const routeFilter = ["/home", "/more"];
            return routeFilter.includes(path);
        }
    },
    watch: {
        $route(newValue, oldValue) {
            this.isReady = false;
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

        //监听页面关闭
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        handleClickLoading() {
            this.loading = !this.loading;
        },
        ready() {
            this.isReady = true;
            this.timer = setTimeout(() => {
                if (localStorage.getItem("isFirstView")) {
                    this.showCard = false;
                } else {
                    localStorage.setItem("isFirstView", 1);
                    this.showCard = true;
                }
            }, 600);
            // avoid repeat showcard
        },
        async handleSelectLang(cookieLang) {
            // 防止初始化第一次报错
            if (!cookieLang) return;
            let res = await queryLanguage(cookieLang.split("/")[2]);
            if (res.status === "success") {
                // 重置
                this.ccy = res.result.ccySymbol;
                this.rate = res.result.rate;
            } else {
                this.$toast(res.errorMsg);
            }
        },
        async getCounryInfo() {
            // 获取对应的国家的汇率和货币符号 语言
            let res = await queryLocalLanguage();
            if (res.status === "success") {
                //根据语言 setCookie => 对插件进行默认设置
                cookie.set("googtrans", "/auto/" + res.result.language);
                //根据货币 汇率 渲染格式化
                this.$translate(res.result.language);
            }
        },
        handleGetDiscount() {
            this.checkTime();
            this.showCard = true;
        },
        checkTime() {
            const preTime = +localStorage.getItem("preTime");
            if (!preTime) {
                localStorage.setItem("preTime", Date.now());
            } else {
                let curTime = Date.now();
                let gapTime = curTime - preTime;
                if (gapTime > 86400000) {
                    localStorage.removeItem("preTime");
                    this.overlayKey++;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#page ::v-deep {
    padding-top: $trans-height;
    @include DEBUG;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: $container-bg1;
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
        right: 15px;
        bottom: 50px;
        transition: opacity 0.4s linear;
        transition-delay: 0.3s;
        z-index: 99;
        img {
            width: 102px;
        }
    }
    .layout-header {
        // margin-top: $trans-height;
        // position: fixed;
        // top: $trans-height;
        // top: 47px;
        // left: 0;
        // right: 0;
        // z-index: 9;
        // background: #fff;
    }
    .layout-main {
    }
    .layout-footer {
        //
    }
}
</style>
