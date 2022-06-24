import * as echarts from 'echarts/core'
export type optionType<T> = echarts.ComposeOption<T>

export function useCreateEcharts<T>(dom: HTMLElement, options: optionType<T>, components: any[]) {
  echarts.use(components)
  echarts.init(dom, 'dark').setOption(options)
}
