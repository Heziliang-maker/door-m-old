<!--  -->
<template>
  <div class="score">
    <van-rate
      class="score-star"
      v-bind="$attrs"
      color="#FEC600"
      void-icon="star"
      allow-half
      void-color="#eee"
    />
    <span class="score-num">
      <a>{{ $attrs.value }} points</a>
    </span>
  </div>
</template>

<script>
export default {
    name: "Score"
};
</script>


<style lang="scss" scoped>
div,
span {
    // outline: 1px solid red;
}
.score {
    line-height: 12px;
    margin: 6px 0;
}
.score-star {
    margin-right: 4px;
    // height: 30px;
}
.score-num {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    // line-height: 1;
    vertical-align: middle;
}
</style>