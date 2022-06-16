export interface IbreadItem {
  path: string
  name: string
  isAllowedToJump: boolean,
  label: string
}
export interface IbreadState {
  breadList: IbreadItem[]
}
