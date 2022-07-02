import { IPagination } from '../type'
export default function usePagination(config: IPagination) {
  const currentPage = ref(config.currentPage)
  const pageSize = ref(config.pageSize)
  const handleSizeChange = (val: number) => {
    pageSize.value = val
  }
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
  }
  return { currentPage, pageSize, handleSizeChange, handleCurrentChange }
}
