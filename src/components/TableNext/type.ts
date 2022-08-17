import { paginationProps } from '@/typings/elComponent'
export interface IPagination extends paginationProps {
  currentPage?: number
  pageSize?: number
}
export interface IColumnParent {
  parentShow: boolean | undefined
  parentId: string | number
}
