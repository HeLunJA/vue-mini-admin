<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
interface IColumnProps {
  columns: columnProps[]
  defaultCheckedKeys: string[]
}
defineProps<IColumnProps>()
const defaultProps = {
  children: 'childrenColumns',
  label: 'label'
}
const handleChange = (node, checked, isChildrenChecked) => {
  if (node.childrenColumns?.length) {
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
<template>
  <el-tree
    :data="columns"
    show-checkbox
    node-key="id"
    :props="defaultProps"
    default-expand-all
    :default-checked-keys="defaultCheckedKeys"
    @check-change="handleChange"
  />
</template>
