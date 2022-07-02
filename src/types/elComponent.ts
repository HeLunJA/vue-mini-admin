import { ElTableColumn, ElTable, ElPagination } from 'element-plus'
export type column = InstanceType<typeof ElTableColumn>['$props']
export type tableProps = InstanceType<typeof ElTable>['$props']
export type paginationProps = InstanceType<typeof ElPagination>['$props']
export type columnProps = column & {
  show?: boolean
  childrenColumns?: columnProps[]
  slot?: string
  id?: string
  headerRender?: (scope: any) => any,
  contentRender?: (scope: any) => any
}
