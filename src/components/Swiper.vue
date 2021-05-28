<!--
 * @Date: 2021-05-27
 * @Description: 
-->
<template>
  <div>
    <van-swipe class="my-swipe" height="124.85" :autoplay="1000" indicator-color="#000000">
      <van-swipe-item v-for="(item,index) in list" :key="index" v-jumpTo=item.advUrl>
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
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
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    // background-color: #39a9ed;
}
img {
    width: 100%;
    height: 100%;
}
</style>
