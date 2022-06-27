<template>
  <el-tree
    :data="(columns as unknown[])"
    show-checkbox
    node-key="prop"
    :props="defaultProps"
    default-expand-all
    :default-checked-keys="(defaultCheckedKeys as string[])"
  />
</template>
<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
interface IColumnProps {
  columns: columnProps[] | null
  defaultCheckedKeys: string[] | null
}
withDefaults(defineProps<IColumnProps>(), { columns: null, defaultCheckedKeys: null })
const defaultProps = {
  children: 'childrenColumns',
  label: 'label'
}
</script>
<style lang="scss" scoped></style>
