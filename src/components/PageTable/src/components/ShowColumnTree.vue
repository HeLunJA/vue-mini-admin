<template>
  <el-tree
    :data="(columns as unknown[])"
    show-checkbox
    node-key="id"
    :props="defaultProps"
    default-expand-all
    :default-checked-keys="(defaultCheckedKeys as string[])"
    @check-change="handleChange"
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
const handleChange = (node, checked, isChildrenChecked) => {
  if (node.childrenColumns && node.childrenColumns.length) {
    // isChildrenChecked为子集是否有选中状态的节点,如果有,父级节点就设置为选中状态,反之就设置为当前状态checked
    if (isChildrenChecked) {
      node.show = true
    } else {
      node.show = checked
    }
  } else {
    node.show = checked
  }
}
</script>
<style lang="scss" scoped></style>
