<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div class="more" v-cloak>
    <div class="title">
      {{tabName}}
    </div>
    <!-- ----------- -->
    <Grid :rate='rate' :ccy='ccy' :list="list" />
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
    beforeCreate() {
        this.$emit("ready", false);
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            const { tabName, classifyId } = this.$route.query;
            this.tabName = tabName;
            queryPortalProducts(classifyId).then((res) => {
                this.list = res.result[0].stringListMap[tabName];
                this.$nextTick(() => {
                    this.$emit("ready", true);
                });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
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
