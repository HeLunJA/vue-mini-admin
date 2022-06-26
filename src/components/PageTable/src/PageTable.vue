<script lang="ts" setup>
import { columnProps, tableProps } from '@/types/elComponent'
interface IPageTableProps extends tableProps {
  columns: columnProps[] | null
}
withDefaults(defineProps<IPageTableProps>(), {
  columns: null
})
const slots = useSlots()
</script>
<template>
  <el-table v-bind="$attrs">
    <table-column v-for="item in columns" :key="item.prop" :item-prop="item">
      <template v-for="slot in Object.keys(slots)" #[slot]="data">
        <slot :name="slot" v-bind="data" />
      </template>
    </table-column>
  </el-table>
</template>
<style lang="scss" scoped></style>
