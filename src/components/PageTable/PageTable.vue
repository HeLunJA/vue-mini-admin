<script lang="ts" setup>
import { columnProps, tableProps, paginationProps } from '@/types/elComponent'
interface IPagination extends paginationProps {
  currentPage?: number
  pageSize?: number
}
interface IPageTableProps extends tableProps {
  columns: columnProps[]
  paginationConfig?: IPagination
}
interface parentType {
  parentShow: boolean | undefined
  parentId: string | number
}
const props = withDefaults(defineProps<IPageTableProps>(), {
  paginationConfig: (): IPagination => {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 30, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  }
})
const currentPage = toRef(props.paginationConfig, 'currentPage')
const pageSize = toRef(props.paginationConfig, 'pageSize')
const tableTotal = ref(0)
const defaultShowKeys = ref<string[]>([])
const setColumns = (columns: columnProps[], parent?: parentType) => {
  columns.forEach((item, index) => {
    item.id = index.toString()
    if (parent?.parentId) {
      item.id = parent?.parentId + '-' + index
    }
    if (typeof parent !== 'undefined') {
      item.show = parent.parentShow
    } else {
      if (!('show' in item)) {
        item.show = true
      }
    }
    if (item.childrenColumns && item.childrenColumns.length) {
      setColumns(item.childrenColumns, { parentShow: item.show, parentId: item.id })
    } else {
      if (item.show) {
        defaultShowKeys.value.push(item.id)
      }
    }
  })
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
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
  <div class="pagination">
    <el-pagination
      v-bind="paginationConfig"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :total="tableTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
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
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 18px;
}
</style>
