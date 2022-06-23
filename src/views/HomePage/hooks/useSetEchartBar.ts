import { optionType, useCreateEcharts } from '@/hooks/echarts/useCreateEcharts'
import { barType, echartComponents } from '@/hooks/echarts/barGraph'
export function useSetEchartBar(dom: HTMLElement) {
  const options: optionType<barType> = {
    backgroundColor: '',
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '点赞人数', '收藏人数', '分享人数', '评论人数'],
        ['6-18', 56821, 56258, 45123],
        ['6-19', 45478, 98562, 23584],
        ['6-20', 25487, 65658, 12521],
        ['6-21', 32541, 52487, 35648],
        ['6-22', 83321, 73244, 55121],
        ['6-23', 86454, 65352, 82255],
        ['6-24', 72040, 53229, 39001]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  }
  useCreateEcharts<barType>(dom, options, echartComponents)
}
