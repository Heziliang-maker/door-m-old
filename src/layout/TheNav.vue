<!--
 * @Date: 2021-12-02
 * @Description: Nav组件
-->
<template>
  <div class="nav">
    <div class="menu">
      <svg-icon
        class="svgicon"
        icon-class="menu"
      ></svg-icon>
    </div>
    <div class="search">
      <svg-icon
        class="svgicon"
        icon-class="search"
      ></svg-icon>
    </div>
    <div class="logo">
      <img
        src="@/assets/header-logo.webp"
        alt="buykop-logo"
      >
    </div>
    <div class="col">
      <svg-icon
        class="svgicon"
        icon-class="collection"
      ></svg-icon>
    </div>
    <div class="user">
      <svg-icon
        class="svgicon"
        icon-class="user"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
    display: grid;
    grid-template-columns: 24px 24px auto 24px 24px [user];
    grid-template-rows: 1fr;
    gap: 0px 16px;
    grid-auto-flow: row;
    justify-items: center;
    align-items: center;
    grid-template-areas: "menu search logo col user";
    width: 375px;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: #fff;

    .svgicon {
        width: 24px;
        height: 24px;
    }

    > div {
        font-size: 0;
    }
}

.menu {
    grid-area: menu;
}

.user {
    grid-area: user;
}

.search {
    grid-area: search;
}

.col {
    grid-area: col;
}

.logo {
    grid-area: logo;

    img {
        height: 26px;
    }
}
.box {
    line-height: 24px;
}
</style>