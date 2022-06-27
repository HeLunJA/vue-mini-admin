<script lang="ts" setup>
import { columnProps, tableProps } from '@/types/elComponent'
interface IPageTableProps extends tableProps {
  columns: columnProps[] | null
}
const props = withDefaults(defineProps<IPageTableProps>(), {
  columns: null
})
const defaultShowKeys = ref<string[]>([])
const setColumns = (columns: columnProps[], parentShow?: boolean | undefined) => {
  columns.forEach((item) => {
    if (!('show' in item)) {
      item.show = true
    }

    if (item.childrenColumns && item.childrenColumns.length) {
      setColumns(item.childrenColumns, item.show)
    } else {
      if (item.show) {
        if (typeof parentShow === 'undefined' || (typeof parentShow === 'boolean' && parentShow)) {
          defaultShowKeys.value.push(item.prop as string)
        }
      }
    }
  })
}
watch(
  () => props.columns,
  (columns) => {
    setColumns(columns as columnProps[])
    console.log(defaultShowKeys.value)
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
    <el-popover placement="left-start" trigger="hover">
      <template #reference>
        <component :is="'Operation'" class="operation"></component>
      </template>
      <show-column-tree :columns="columns" :default-checked-keys="defaultShowKeys" />
    </el-popover>
  </div>
  <el-table v-bind="$attrs">
    <table-column v-for="item in columns" :key="item.prop" :item-prop="item">
      <template v-for="slot in Object.keys(slots)" #[slot]="data">
        <slot :name="slot" v-bind="data" />
      </template>
    </table-column>
  </el-table>
</template>
<style lang="scss" scoped>
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
