<template>
  <div class="home">
    <!-- 轮播展示 -->
    <div class="banner">
      <Swiper :list="bannerList" />
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
      <Grid :list="curListForTab" />
      <!-- ----------- -->
    </div>
    <div class="seemore" @click="handleSeemore">更多</div>
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
    components: {
        Swiper,
        Slider,
        Grid,
        Footer
    },

    data() {
        return {
            // isLoaded: false,
            bannerList: [],
            hotsaleList: [[], []], //avoid error
            cateMap: [],
            curTabName: "Outdoor&Camping Tent",
            TabList: ["Outdoor&Camping Tent", "Sportswear", "Adult", "Fashion Clothes", "Household Supplies "]
        };
    },
    beforeCreate() {
        this.$emit("ready", false);
    },
    created() {
        this.initData();
    },
    computed: {
        curListForTab() {
            return this.cateMap[this.curTabName];
        }
    },

    methods: {
        initData() {
            const url = `/shop-admin/v1/portals/query_portals`;
            axios.post(url).then((res) => {
                const { result } = res.data;
                const [data] = result;
                this.bannerList = data.portalsAdvDTOS;
                let list1 = data.portalsHotProduct.slice(0, 3);
                let list2 = data.portalsHotProduct.slice(3);
                this.hotsaleList = [list1, list2]; //not responsive
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
                    list: this.curListForTab
                }
            });
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
    width: 54px;
    height: 24px;
    background: #000000;
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    margin: 10px auto 20px;
    cursor: pointer;
}
</style>
