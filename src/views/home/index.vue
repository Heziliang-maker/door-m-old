<template>
  <div>
    <div class="home">
      <!-- 轮播展示 -->
      <div class="banner">
        <Swiper :list="bannerList" />
      </div>
    </div>
    <!-- slide 展示 -->
    <div class="slide">
      <div class="slide-title">
        Hot Sale New Style
      </div>
      <Slider :list='hotsaleList[0]' />
      <Slider :list='hotsaleList[1]' />
    </div>
    <!-- tab + lsit 展示 -->
    <div class="grid">
      <!-- tabs -->
      <van-tabs v-model="curTabName" color="#000000" line-height='1px' line-width='90px' :ellipsis="false">
        <van-tab v-for="(tab,i) in TabList" :key="i" :title="tab" :name="tab"></van-tab>
      </van-tabs>
      <!-- ----------- -->
      <Grid :rate='rate' :ccy='ccy' :list="curListForTab" />
      <!-- ----------- -->
    </div>
    <div class="seemore" @click="handleSeemore">
      <div>more ></div>
    </div>
    <!-- <div ref="btnForDiscount" class="discount_btn" @click="handleGetDiscount"><img src="@/assets/discount_btn.png"
           alt="discount"></div> -->
  </div>
</template>
<script>
import Swiper from "@/components/Swiper";
import Slider from "@/components/Slide";
import Grid from "@/components/Grid";
import Footer from "@/layout/Footer";

// import
import axios from "axios";
export default {
    name: "home",
    props: {
        show: Boolean,
        ccy: String,
        rate: String | Number
    },
    components: {
        Swiper,
        Slider,
        Grid,
        Footer
    },

    data() {
        return {
            bannerList: [],
            hotsaleList: [[], []], //avoid error
            cateMap: [],
            curTabName: "", //当前tab key
            TabList: []
        };
    },
    beforeCreate() {
        this.$emit("ready", false);
    },
    created() {
        this.initData();
    },
    mounted() {
        // this.$refs.btnForDiscount.style.opacity = 1;
    },
    computed: {
        curListForTab() {
            return this.cateMap[this.curTabName];
        }
    },
    methods: {
        initData() {
            const url = `/shop-admin/v1/portal/query_portals`;
            axios.post(url).then((res) => {
                const { result } = res.data;
                const [data] = result;
                this.bannerList = data.portalsAdvDTOS;
                let list1 = data.portalsHotProduct.slice(0, 3);
                let list2 = data.portalsHotProduct.slice(3);
                this.hotsaleList = [list1, list2]; //not responsive
                this.TabList = Object.keys(data.stringListMap);
                this.curTabName = this.TabList[0]; //默认为第一项
                this.cateMap = data.stringListMap;

                this.$nextTick(() => {
                    this.$emit("ready", true);
                });
            });
        },
        handleSeemore() {
            console.log("=>", this.curTabName);
            this.$router.push({
                path: "/more",
                query: {
                    tabName: this.curTabName,
                    list: JSON.stringify(this.curListForTab)
                }
            });
        },
        handleGetDiscount() {
            // this.showCard = true;
            this.$emit("update:show", true);
        }
    }
};
</script>
<style lang="scss" scoped>
.home {
    width: 100%;
}

.banner {
    width: 100%;
    margin-bottom: 10px;
}
.banner-sk {
    width: 100%;
    height: 124.85px;
}
.slide {
    margin: 20px 0 30px;
    &-title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: center;
        margin-bottom: 10px;
    }
}
.slide-sk {
    width: 100%;
    height: 200px;
}
.grid-sk {
    width: 100%;
    height: 200px;
}
.seemore {
    text-align: center;
    width: 54px;

    background: #000000;
    margin: 10px auto 20px;
    line-height: 24px;
    & > div {
        height: 24px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        cursor: pointer;
    }
}
.discount_btn {
    position: fixed;
    right: 21px;
    bottom: 29px;
    opacity: 0;
    transition: opacity 0.4s linear;
    transition-delay: 0.3s;
    z-index: 99;
    img {
        width: 77px;
        height: 77px;
    }
}
</style>

