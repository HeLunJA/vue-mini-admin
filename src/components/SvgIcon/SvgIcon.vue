<script lang="ts" setup>
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: String,
    default: '1em'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<template>
  <svg aria-hidden="true" class="svg-icon" :width="size" :height="size">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
