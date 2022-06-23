export interface ItabItem {
  label: string
  name: string
  path: string
}
export interface IGlobalState {
  token: string
  tabList: ItabItem[]
}
