<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const brandList = computed(() => route.matched.filter((item) => item.path !== '/'))
</script>

<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="in-out">
      <el-breadcrumb-item v-for="item in brandList" :key="item.path">
        <span class="bold" v-if="item.children.length">{{ item.meta.label }}</span>
        <span v-else>{{ item.meta.label }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
