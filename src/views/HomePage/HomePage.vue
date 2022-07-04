<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'

import { useSwitchDark } from '@/hooks/useChangeTheme'
import { useGetGeneralData } from './hooks/useGetGeneralData'
import { useCreateEcharts } from '@/hooks/useCreateEcharts'

const echartDom = ref<HTMLDivElement>()
const isDark = useSwitchDark()
const spaceColor = computed(() => (isDark.value ? '#3b3636 ' : '#ffffff'))
// 获取昨日概况数据和骨架屏状态
const { generals, isSkeleton } = useGetGeneralData()
const barOptions: EChartsOption = {
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
onMounted(() => {
  // 七日概況柱状图
  const { setOptions } = useCreateEcharts(echartDom as Ref<HTMLDivElement>)
  setOptions(barOptions)
})
</script>
<template>
  <div class="body">
    <el-card shadow="never">
      <div class="title">昨日概况</div>
      <div class="box">
        <template v-for="(item, index) in generals" :key="item.label">
          <div v-if="!isSkeleton" class="item">
            <div class="label">{{ item.label }}</div>
            <div class="number">{{ item.number }}</div>
            <svg-icon size="80px" :name="item.icon" />
          </div>
          <el-skeleton v-else style="--el-skeleton-circle-size: 200px" animated>
            <template #template>
              <el-skeleton-item class="skeleton" />
              <el-skeleton-item class="skeleton" />
              <el-skeleton-item class="skeleton" />
              <el-skeleton-item variant="circle" style="width: 80px; height: 80px" />
            </template>
          </el-skeleton>
          <div v-if="index !== generals.length - 1" class="border"></div>
        </template>
      </div>
    </el-card>
    <el-card shadow="never" class="card">
      <div class="title">七日概况</div>
      <div class="echartBox">
        <div ref="echartDom" style="width: 100%; height: 300px"></div>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.skeleton {
  margin-bottom: 6px;
}
.body {
  height: 100%;
  :deep(.el-card__body) {
    padding: 0;
  }
  .card {
    margin-top: 20px;
  }
  .title {
    position: relative;
    font-weight: bold;
    padding: 22px 0;
    padding-left: 16px;
    border-bottom: 1px solid $theme-border-color;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0px;
      width: 4px;
      height: 16px;
      background-color: #0089ff;
    }
  }
  .box {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    :deep(.el-skeleton) {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .border {
      height: 160px;
      width: 1px;
      background: linear-gradient(180deg, v-bind(spaceColor) 0%, $theme-border-color 50%, v-bind(spaceColor) 100%);
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      .label {
        margin-bottom: 16px;
        font-weight: 600;
      }
      .number {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 8px;
      }
    }
  }
  .echartBox {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
