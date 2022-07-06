<script lang="ts" setup>
import type { columnProps, tableProps } from '@/types/elComponent'
import type { IPagination } from './type'

import { useSwitchDark } from '@/hooks/useChangeTheme'
import usePagination from './hooks/usePagination'
import useSetColumn from './hooks/useSetColumn'
import useGetTableData from './hooks/useGetTableData'

interface IPageTableProps extends tableProps {
  columns: columnProps[]
  paginationConfig?: IPagination
  dataRequest: Function
  searchParam: Object
}

const props = withDefaults(defineProps<IPageTableProps>(), {
  paginationConfig: (): IPagination => {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 30, 50],
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  }
})
const slots = useSlots()
const isDark = useSwitchDark()
const theadColor = computed(() => (isDark.value ? '#b9bcc2' : '#433c3c'))
const { currentPage, pageSize, handleSizeChange, handleCurrentChange } = usePagination(props.paginationConfig)
const { tableData, tableLoading, tableTotal, getTableData } = useGetTableData(props, currentPage, pageSize)
const { defaultShowKeys, setColumns } = useSetColumn()
watch(
  () => props.columns,
  (columns) => {
    setColumns(columns)
  },
  {
    immediate: true
  }
)
defineExpose({ getTableData })
</script>
<template>
  <div class="option">
    <div></div>
    <div>
      <el-button icon="RefreshLeft" circle @click="getTableData" />
      <el-popover popper-class="down-popover" placement="left-start" trigger="click">
        <template #reference>
          <el-button icon="operation" circle />
        </template>
        <show-column-tree :columns="columns" :default-checked-keys="defaultShowKeys" />
      </el-popover>
    </div>
  </div>
  <el-table v-loading="tableLoading" class="table" v-bind="$attrs" :data="tableData">
    <!-- <el-table-column label="序号" align="center" fixed="left">
      <template #default="scope">
        <div>{{ scope.$index + 1 }}</div>
      </template>
    </el-table-column> -->
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
.table {
  :deep(thead) {
    color: v-bind(theadColor);
  }
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
