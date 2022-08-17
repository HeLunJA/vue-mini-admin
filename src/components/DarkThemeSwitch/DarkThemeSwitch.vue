<script setup lang="ts">
import useChangeDarkTheme from '@/hooks/useChangeDarkTheme'
const { isDark, changeTheme } = useChangeDarkTheme()
const iconName = computed(() => (isDark.value ? 'moon' : 'sunny'))
</script>

<template>
  <component :is="iconName" class="setIcon" @click="changeTheme(!isDark)"></component>
</template>

<style lang="scss" scoped>
.setIcon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin-left: 12px;
}
</style>
