<script setup lang="ts"></script>

<template>
  <div class="main">
    <el-card class="card" shadow="never"><router-view></router-view></el-card>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: calc(100% - 40px);
  .card {
    height: 100%;
    width: 100%;
    border: 0;
  }
}
</style>
