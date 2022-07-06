import { IPagination } from '../type'
import { Ref } from 'vue'
export default function usePagination(config: IPagination) {
  const currentPage = ref(config.currentPage) as Ref<number>
  const pageSize = ref(config.pageSize) as Ref<number>
  const handleSizeChange = (val: number) => {
    pageSize.value = val
  }
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
  }
  return { currentPage, pageSize, handleSizeChange, handleCurrentChange }
}
