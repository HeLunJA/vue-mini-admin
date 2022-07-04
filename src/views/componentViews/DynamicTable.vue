<script lang="tsx" setup>
import { columnProps } from '@/types/elComponent'
import { getTableData } from '@/service/home'
import dayjs from 'dayjs'
const columnOptions = ref<columnProps[]>([
  {
    label: '登录时间',
    prop: 'date',
    contentRender: (scope) => dayjs(scope.data.row.date).format('YYYY-MM-DD')
  },
  {
    label: '用户信息',
    childrenColumns: [
      {
        label: '姓名',
        prop: 'name',
        headerRender: (scope) => <el-button>{scope.row.label}</el-button>,
        contentRender: (scope) => {
          return scope.data.row.name && <el-tag>{scope.data.row.name}</el-tag>
        }
      },
      { label: '年龄', prop: 'age' },
      { label: '地址', prop: 'address' }
    ]
  },
  {
    label: '账号信息',
    childrenColumns: [
      { label: '登录账号', prop: 'account' },
      {
        label: '头像',
        prop: 'headPhoto',
        contentRender: (scope) => (
          <el-image
            style="width: 50px; height: 50px"
            src={scope.data.row.headPhoto}
            preview-src-list={[scope.data.row.headPhoto]}
            preview-teleported={true}
            fit="cover"
          />
        )
      },
      {
        label: '徒弟信息',
        childrenColumns: [
          { label: '等级', prop: 'level', sortable: true },
          { label: '金币数量', prop: 'gold' }
        ]
      },
      { label: '是否可用', prop: 'active' }
    ]
  },
  { label: '日在线时长', prop: 'activeTime' },
  { label: '操作', prop: 'pt', fixed: 'right' }
])
const searchParam = ref({})
</script>
<template>
  <div class="card" shadow="never">
    <PageTable :data-request="getTableData" :search-param="searchParam" :columns="columnOptions" border></PageTable>
  </div>
</template>
<style lang="scss" scoped>
.card {
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  background-color: $theme--card-bgc-color;
}
</style>
