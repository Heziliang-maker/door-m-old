<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <van-swipe
    class="my-swipe"
    :autoplay="1000"
    indicator-color="#000000"
  >
    <van-swipe-item
      class="swipe-item"
      v-for="(item,index) in list"
      :key="index"
    >
      <van-image
        width="100%"
        height="100%"
        :src="item.img"
        fit="cover"
        v-jumpTo="{url:item.advUrl,type:3}"
      >
        <template v-slot:loading>
          <van-loading
            type="spinner"
            size="20"
          />
        </template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.my-swipe ::v-deep {
    .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        height: 124.85px;
    }
}
</style>
