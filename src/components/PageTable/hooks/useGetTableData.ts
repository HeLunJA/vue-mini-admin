import type { Ref } from 'vue'
export default function useGetTableData(props, currentPage: Ref<number>, pageSize: Ref<number>) {
  const tableData = ref([])
  const tableLoading = ref(false)
  const tableTotal = ref(0)
  const getTableData = () => {
    tableLoading.value = true
    const searchParam = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      ...props.searchParam
    }
    props.dataRequest(searchParam).then((result) => {
      if (result.data.code === '0000') {
        tableData.value = result.data.list
        tableTotal.value = result.data.total
        tableLoading.value = false
      }
    })
  }
  watchEffect(() => {
    getTableData()
  })
  return { tableData, tableLoading, tableTotal, getTableData }
}
