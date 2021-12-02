<!--
 * @Date: 2021-12-02
 * @Description: Nav组件
-->
<template>
  <div class="nav">
    <div class="menu">1</div>
    <div class="user">2</div>
    <div class="search">3</div>
    <div class="col">4</div>
    <div class="logo">5</div>
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
    align-content: center;
    grid-template-areas: "menu search logo col user";
    width: 375px;
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
}
</style>