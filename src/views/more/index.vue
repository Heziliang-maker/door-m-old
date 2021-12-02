<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div class="more">
    <div class="title">
      {{tabName}}
    </div>
    <!-- ----------- -->
    <Grid
      :rate='rate'
      :ccy='ccy'
      :list="list"
    />
    <!-- ----------- -->
  </div>
</template>

<script>
import Grid from "@/components/Grid";
import { queryPortalProducts } from "@/api";
export default {
    name: "more",
    props: {
        ccy: String,
        rate: String | Number
    },
    data() {
        return {
            // 默认标题
            tabName: "",
            list: []
        };
    },
    components: {
        Grid
    },
    async created() {
        await this.initData();
        this.$emit("ready");
    },
    methods: {
        async initData() {
            const { tabName, classifyId } = this.$route.query;
            this.tabName = tabName;
            const res = await queryPortalProducts(classifyId);
            this.list = res.result[0].stringListMap[tabName];
        }
    }
};
</script>

<style lang="scss" scoped>
.more {
    .title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: center;
        border-top: 1px solid #d8d8d8;
        padding: 20px 0 10px;
    }
}
</style>
