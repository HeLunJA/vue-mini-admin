<script lang="ts" setup>
import { columnProps } from '@/types/elComponent'
const columnOptions = ref<columnProps[]>([
  { label: '时间', prop: 'date', align: 'center' },
  { label: '地址', prop: 'address', align: 'center' },
  {
    label: '信息',
    prop: 'info',
    align: 'center',
    children: [
      { label: '年龄', prop: 'age', align: 'center' },
      { label: '姓名', prop: 'name', align: 'center' }
    ]
  }
])
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
</script>
<template>
  <PageTable :columns="columnOptions" :data="tableData" border />
</template>
<style scoped></style>
