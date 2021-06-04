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
    <Grid :list="list" />
    <!-- ----------- -->
  </div>
</template>

<script>
import Grid from "@/components/Grid";
export default {
    name: "more",
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
    created() {
        console.log("=>", "created");
    },
    mounted() {
        console.log("=>", "mounted");
        this.init();
    },
    methods: {
        init() {
            console.log("this.$route=>", this.$route);
            const { query } = this.$route;
            const { tabName, list } = query;
            this.list = JSON.parse(list);
            this.tabName = tabName;
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
