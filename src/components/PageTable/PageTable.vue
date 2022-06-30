<script lang="ts" setup>
import { columnProps, tableProps } from '@/types/elComponent'
interface IPageTableProps extends tableProps {
  columns: columnProps[] | null
}
interface parentType {
  parentShow: boolean | undefined
  parentIndex: string | number
}
const props = withDefaults(defineProps<IPageTableProps>(), {
  columns: null
})
const defaultShowKeys = ref<string[]>([])
const setColumns = (columns: columnProps[], parent?: parentType) => {
  columns.forEach((item, index) => {
    item.id = index.toString()
    if (parent?.parentIndex || parent?.parentIndex === 0) {
      item.id += '-' + index
    }
    if (typeof parent !== 'undefined') {
      item.show = parent.parentShow
    } else {
      if (!('show' in item)) {
        item.show = true
      }
    }
    if (item.childrenColumns && item.childrenColumns.length) {
      setColumns(item.childrenColumns, { parentShow: item.show, parentIndex: index })
    } else {
      if (item.show) {
        defaultShowKeys.value.push(item.id)
      }
    }
  })
}
watch(
  () => props.columns,
  (columns) => {
    setColumns(columns as columnProps[])
  },
  {
    immediate: true
  }
)
const slots = useSlots()
</script>
<template>
  <div class="option">
    <div></div>
    <el-popover popper-class="down-popover" placement="left-start" trigger="click">
      <template #reference>
        <component :is="'Operation'" class="operation"></component>
      </template>
      <show-column-tree :columns="columns" :default-checked-keys="defaultShowKeys" />
    </el-popover>
  </div>
  <el-table class="table" v-bind="$attrs">
    <table-column v-for="item in columns" :key="item.id" :item-prop="item">
      <template v-for="slot in Object.keys(slots)" #[slot]="data">
        <slot :name="slot" v-bind="data" />
      </template>
    </table-column>
  </el-table>
</template>
<style lang="scss">
.down-popover {
  background: $theme--card-bgc-color !important;
  .el-tree {
    background: $theme--card-bgc-color !important;
  }
}
</style>
<style lang="scss" scoped>
.table :deep(.cell) {
  height: 20px !important; //固定表头高度,解决列显隐表格抖动
}
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  .operation {
    width: 20px;
    height: 20px;
  }
}
</style>
