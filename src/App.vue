<template>
  <div id="app">
    <div class="layout-header">
      <Header />
    </div>
    <div class="layout-main ">
      <router-view @ready="ready" />
    </div>
    <div class="layout-footer" v-if="isReady">
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            isReady: false
        };
    },
    methods: {
        ready() {
            this.isReady = true;
        }
    },
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
</style>
