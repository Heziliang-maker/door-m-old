<template>
  <div>
    <!-- 轮播展示 -->
    <div class="banner">
      <Swiper :list="bannerList" />
    </div>
    <!-- slide 展示 -->
    <!-- <div class="slide">
      <div class="slide-title">
        Hot Sale New Style
      </div>
      <Slider :list='hotsaleList[0]' />
      <Slider :list='hotsaleList[1]' />
    </div> -->
    <!-- tab + lsit 展示 -->
    <div class="grid">
      <!-- <van-tabs
        v-model="curTabName"
        color="#000000"
        line-height='1px'
        line-width='90px'
        :ellipsis="false"
      >
        <van-tab
          v-for="(tab,i) in TabList"
          :key="i"
          :title="tab"
          :name="tab"
        ></van-tab>
      </van-tabs> -->
      <grid
        :rate='rate'
        :ccy='ccy'
        :list="curListForTab"
        @update="updateCurListForTab"
      >
        <template #header>New This Week</template>
        <template #footer>See More</template>
      </grid>
    </div>
  </div>
</template>
<script>
import Swiper from "@/components/Swiper";
import Slider from "@/components/Slide";
import Grid from "@/components/Grid";
import { trackViewBehavior } from "@/api/index";
import { queryPortalProducts } from "@/api";
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
        Grid
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
    async mounted() {
        await this.initData();
        this.$emit("ready");
    },
    computed: {
        curListForTab() {
            return this.cateMap[this.curTabName];
        },
        classifyId() {
            return this.curListForTab[0].classifyId;
        }
    },
    methods: {
        updateCurListForTab(productUrl) {
            const target = this.curListForTab.find((item) => item.productUrl === productUrl);
            target.isView = !target.isView;
            // console.log("=target>", target);
        },
        async initData() {
            const res = await queryPortalProducts();

            const data = res.result[0];
            this.bannerList = data.portalsAdvDTOS;
            let list1 = data.portalsHotProduct.slice(0, 3);
            let list2 = data.portalsHotProduct.slice(3);
            this.hotsaleList = [list1, list2]; //not responsive
            this.TabList = Object.keys(data.stringListMap);
            this.curTabName = this.TabList[0]; //默认为第一项
            this.TabList.forEach((cate) => {
                data.stringListMap[cate].forEach((item) => {
                    item.isView = false;
                });
            });
            this.cateMap = data.stringListMap;
        },
        handleSeemore() {
            this.$router.push({
                path: "/more",
                query: {
                    tabName: this.curTabName,
                    classifyId: this.classifyId
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.banner {
    width: 100%;
    margin-bottom: 10px;
    padding: $container-padding;
    box-sizing: border-box;
    background: $container-bg2;
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

