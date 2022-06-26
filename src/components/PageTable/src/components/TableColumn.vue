<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
interface IColumnProps {
  itemProp: columnProps | null
}
withDefaults(defineProps<IColumnProps>(), { itemProp: null })
</script>
<template>
  <el-table-column v-if="itemProp?.childrenColumns && itemProp.childrenColumns.length" v-bind="itemProp">
    <table-column v-for="childrenItem in itemProp.childrenColumns" :key="childrenItem.prop" :item-prop="childrenItem" />
  </el-table-column>
  <el-table-column v-else v-bind="itemProp" />
</template>
<style lang="scss" scoped></style>
