<!--
 * @Date: 2021-05-28
 * @Description: 
-->
<template>
  <div class="aboutus">
    <div class="title">About US</div>
    <div class="wrapper">
      <div class="banner">
        <img src="@/assets/banner.png" alt="">
      </div>
      <div class="text">
        <header>Company profile</header>
        <main>Located in the core regional center of Lujiazui, Shanghai, FormulaRay Information Technology (Shanghai)
          Co., Ltd. is committed to helping manufacturing enterprises seize the current cross-border e-commerce
          opportunities by leveraging a variety of channels and business resources around the world.</main>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0 19px;
}
.aboutus {
    .title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 20px;

        text-align: center;
        padding: 20px 0 0;
        border-top: 1px solid #d8d8d8;
    }
    .banner {
        width: 100%;
        margin: 20px 0;
        img {
            width: 100%;
        }
    }
    .text {
        header {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 20px;
            margin-bottom: 10px;
        }
        main {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 17px;
        }
    }
}
</style>
