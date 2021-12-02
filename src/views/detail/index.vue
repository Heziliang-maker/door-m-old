<!--
 * @Date: 2021-11-05
 * @Description: 
-->
<template>
  <div class="detail">
    <!-- Product Display -->
    <ProductDisplay :data-source="data" />
    <!-- Buy It Now -->
    <div class="detail-submit">
      <van-button
        type="primary"
        block
        @click="handleClickBuy"
      >Buy It Now</van-button>
    </div>

  </div>
</template>

<script>
import { queryProductsDetail } from "@/api/index";
import ProductDisplay from "./components/ProductDisplay.vue";
export default {
    name: "Detail",
    components: {
        ProductDisplay
    },
    data() {
        return {
            data: {}
        };
    },
    async created() {
        await this.initData();
        this.$emit("ready");
    },
    methods: {
        async initData() {
            const { query } = this.$route;
            const body = JSON.parse(query.requestQuery);
            const res = await queryProductsDetail(body);
            this.data = res.result.data;
        },
        handleClickBuy() {
            const { query } = this.$route;
            window.open(query.url, "_blank");
        }
    }
};
</script>

<style lang="scss" scoped>
.detail-submit {
    margin-top: 16px;
    padding: 14px;
    .van-button {
        background-color: #111111;
        border: none;
        border-radius: 5px;
    }
}
</style>