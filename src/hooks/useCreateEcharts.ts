import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { useSwitchDark } from '@/hooks/useChangeTheme'
import echarts from '@/utils/echarts'
type themeType = 'dark' | 'default'
export function useCreateEcharts(el: Ref<HTMLDivElement>) {
  const echartOptions = ref<EChartsOption>({})
  const isDark = useSwitchDark()
  let myEchart: echarts.ECharts | null = null
  function initEcharts(theme: themeType = 'default') {
    myEchart = echarts.init(unref(el), theme)
  }
  function setOptions(options: EChartsOption) {
    echartOptions.value = options
    if (!myEchart) {
      initEcharts(isDark.value ? 'dark' : 'default')
    } else {
      myEchart?.dispose()
      initEcharts(isDark.value ? 'dark' : 'default')
    }
    myEchart?.setOption(options)
  }
  watch(
    () => isDark.value,
    () => {
      setOptions(echartOptions.value as EChartsOption)
    }
  )
  return { setOptions }
}
