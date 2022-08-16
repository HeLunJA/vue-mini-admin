<script lang="tsx" setup>
import { columnProps } from '@/types/elComponent'
import { getTableData } from '@/service/home'
import dayjs from 'dayjs'
import { editTableData } from '@/service/home'
import { ElMessage } from 'element-plus'

interface IParams {
  name?: string
  active?: number
}

const pageTable = ref()
const searchParam = reactive<IParams>({})

const isSwitchLoading = ref(false)
const formData = ref<IParams>({})

const isShowDrawer = ref(false)

const accountTypes = ref([
  { text: 'VIP账号', value: '1' },
  { text: '普通账号', value: '2' }
])
const editActiveNumber = async (row, val: number) => {
  isSwitchLoading.value = true
  const formData = JSON.parse(JSON.stringify(row))
  formData.active = val
  const result = await editTableData(formData)
  if (result.data.code === '0000') {
    row.active = val
    ElMessage.success(result.data.msg)
    pageTable.value.getTableData()
  }
  isSwitchLoading.value = false
}
const handleEdit = async (row) => {
  isShowDrawer.value = true
  formData.value = row
}
const columnOptions = ref<columnProps[]>([
  {
    label: '登录时间',
    prop: 'date',
    contentRender: (scope) => dayjs(scope.data.row.date).format('YYYY-MM-DD HH:ss')
  },
  {
    label: '用户信息',
    childrenColumns: [
      {
        label: '姓名',
        prop: 'name',
        headerRender: () => (
          <el-input
            v-model={searchParam.name}
            onChange={() => {
              pageTable.value.getTableData()
            }}
            placeholder="输入姓名查找"
          />
        ),
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
        label: '账号类型',
        prop: 'accountType',
        columnKey: 'accountType',
        filters: accountTypes.value,
        filterMethod: (value: string, row: any, column: any) => {
          const property = column['property']
          return row[property] == value
        },
        contentRender: (scope) =>
          scope.data.row.accountType &&
          accountTypes.value.map((item) => (item.value == scope.data.row.accountType ? <div>{item.text}</div> : null))
      },
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
        label: '其他信息',
        childrenColumns: [
          { label: '等级', prop: 'level', sortable: true },
          { label: '金币数量', prop: 'gold' }
        ]
      },
      {
        label: '是否可用',
        prop: 'active',
        contentRender: (scope) =>
          typeof scope.data.row.active === 'number' && (
            <el-switch
              model-value={scope.data.row.active}
              loading={isSwitchLoading.value}
              onChange={(val) => {
                editActiveNumber(scope.data.row, val)
              }}
              inline-prompt
              active-text="是"
              inactive-text="否"
              active-value={1}
              inactive-value={0}
            />
          )
      }
    ]
  },
  { label: '操作', slot: 'opt', fixed: 'right' }
])
</script>
<template>
  <div class="card">
    <table-next
      ref="pageTable"
      :data-request="getTableData"
      :search-param="searchParam"
      :columns="columnOptions"
      :max-height="600"
      border
    >
      <template #opt="scope">
        <el-button type="primary" icon="Edit" text @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </table-next>
    <el-drawer v-model="isShowDrawer" title="编辑" :before-close="() => (isShowDrawer = false)">
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.card {
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  background-color: var(--el-bg-color-overlay);
}
</style>
