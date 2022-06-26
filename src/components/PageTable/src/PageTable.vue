<script lang="ts" setup>
import { columnProps, tableProps } from '@/types/elComponent'
interface IPageTableProps extends tableProps {
  columns: columnProps[] | null
}
withDefaults(defineProps<IPageTableProps>(), {
  columns: null
})
</script>
<template>
  <el-table v-bind="$attrs">
    <table-column v-for="item in columns" :key="item.prop" :item-prop="item" />
  </el-table>
</template>
<style lang="scss" scoped></style>
