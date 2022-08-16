import type { columnProps } from '@/types/elComponent'
import type { IColumnParent } from '../type'
export default function useSetColumn() {
  const defaultShowKeys = ref<string[]>([])
  const setColumns = (columns: columnProps[], parent?: IColumnParent) => {
    columns.forEach((item, index) => {
      item.id = index.toString()
      if (parent?.parentId) {
        item.id = parent?.parentId + '-' + index
      }
      if (typeof parent !== 'undefined') {
        item.show = parent.parentShow
      } else {
        if (!('show' in item)) {
          item.show = true
        }
      }
      if (item.childrenColumns?.length) {
        setColumns(item.childrenColumns, { parentShow: item.show, parentId: item.id })
      } else {
        if (item.show) {
          defaultShowKeys.value.push(item.id)
        }
      }
    })
  }
  return { defaultShowKeys, setColumns }
}
