<!--
 * @Date: 2021-05-27
 * @Description: 
-->

<template>
  <div
    class="header"
    id="header"
  >
    <div
      class="logo"
      @click="$router.push('/home')"
    >
      <img
        src="@/assets/header-logo.webp"
        alt=""
      >
    </div>
  </div>
</template>


<style lang="scss" scoped>
.header {
    height: 44px;
    display: flex;
    // justify-content: center;
    padding-left: 19px;
    align-items: center;

    .logo {
        height: 30px;
        img {
            height: 100%;
        }
    }
}
</style>