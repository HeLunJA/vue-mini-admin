<script lang="ts" setup>
import { columnProps, tableProps } from '@/types/elComponent'
// 继承Eltable类型给包装组件提供类型提示(defineProps不能从外部导入接口或类型传入泛型)
interface IPageTableProps extends tableProps {
  columns: columnProps[] | null
}
withDefaults(defineProps<IPageTableProps>(), {
  columns: null
})
</script>
<template>
  <el-table v-bind="$attrs">
    <el-table-column v-for="item in columns" :key="item.prop" v-bind="item" />
  </el-table>
</template>
<style lang="scss" scoped></style>
