<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const goHome = () => {
  router.replace({ name: 'home' })
}
const reload = () => {
  router.replace({ path: route.path })
}
</script>

<template>
  <div class="not-found">
    <div class="content">
      <img class="img" src="@/assets/img/404.png" alt="" />
      <div class="text">Error，页面出错啦！！请点击返回首页或者刷新页面~</div>
      <div class="btns">
        <el-button round @click="goHome">返回首页</el-button>
        <el-button type="primary" @click="reload" round>刷新页面</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  position: relative;
  height: 100vh;
  .content {
    position: absolute;
    top: 200px;
    right: 0;
    left: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img {
      width: 593px;
      height: 327px;
    }
    .text {
      margin-top: 22px;
      font-size: 14px;
      color: #999999;
    }
    .btns {
      margin-top: 54px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
