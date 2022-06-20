<script setup lang="ts"></script>

<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
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
