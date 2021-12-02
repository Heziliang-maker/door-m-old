<!--
 * @Date: 2021-12-02
 * @Description: Nav组件
-->
<template>
  <div class="nav">
    <div class="logo">
      <svg-icon icon-class="chanping"></svg-icon>
    </div>
    <div class="collection"></div>
    <div class="user"></div>
    <div class="menu"></div>
    <div class="search"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
    display: grid;
    grid-template-columns: 24px [menu] 24px auto 24px 24px;
    grid-template-rows: 1fr;
    gap: 0px 16px;
    grid-auto-flow: row;
}

.logo {
    grid-area: 1 / menu / 2 / 3;
}

.collection {
    grid-area: 1 / 3 / 2 / 4;
}

.user {
    grid-area: 1 / 4 / 2 / 5;
}

.menu {
    grid-area: 1 / 1 / 2 / menu;
}

.search {
    grid-area: 1 / menu / 2 / 3;
}
</style>