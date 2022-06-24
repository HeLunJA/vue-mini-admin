import * as echarts from 'echarts/core'
import { DatasetComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, SVGRenderer])
export default echarts
