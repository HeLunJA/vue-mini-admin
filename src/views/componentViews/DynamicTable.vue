<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
const columnOptions = ref<columnProps[]>([
  {
    label: '信息',
    prop: 'info',
    align: 'center',
    childrenColumns: [
      { label: '姓名', prop: 'name', align: 'center', slot: 'name' },
      { label: '年龄', prop: 'age', align: 'center' }
    ]
  },
  { label: '时间', prop: 'date', align: 'center', slot: 'date' },
  { label: '地址', prop: 'address', align: 'center', slot: 'address' }
])
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    age: 10,
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    age: 15,
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    age: 22,
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    age: 23,
    address: 'No. 189, Grove St, Los Angeles'
  }
])
</script>
<template>
  <PageTable :columns="columnOptions" :data="tableData" border>
    <template #date="scope">
      <div style="display: flex; align-items: center">
        <span>{{ scope.row.date }}---时间插槽</span>
      </div>
    </template>
    <template #address="scope">
      <div style="display: flex; align-items: center">
        <span>{{ scope.row.address }}---地址插槽</span>
      </div>
    </template>
    <template #name="scope">
      <div style="display: flex; align-items: center">
        <span>{{ scope.row.name }}---姓名插槽</span>
      </div>
    </template>
  </PageTable>
</template>
<style scoped></style>
