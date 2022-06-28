import { ElTableColumn, ElTable } from 'element-plus'
export type column = InstanceType<typeof ElTableColumn>['$props']
export type tableProps = InstanceType<typeof ElTable>['$props']
export type columnProps = column & {
  show?: boolean
  childrenColumns?: columnProps[]
  slot?: string
  id?: string
}
