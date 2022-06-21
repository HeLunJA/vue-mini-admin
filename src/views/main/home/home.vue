<template>
  <div class="body">
    <el-card>
      <div class="title">昨日概况</div>
      <div class="box">
        <template v-for="(item, index) in generals" :key="item.label">
          <div class="item" v-if="!isSkeleton">
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
          <div class="border" v-if="index !== generals.length - 1"></div>
        </template>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref, onMounted } from 'vue'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { getGeneralData } from '@/service/home'
import { useSwitchDark } from '@/hooks/useChangeTheme'
interface IGeneral {
  label: string
  icon: string
  number: Ref
}
const isDark = useSwitchDark()
const borderColor = computed(() => (isDark.value ? '#4c4d4f ' : '#dcdfe6'))
const centerColor = computed(() => (isDark.value ? '#8f8484 ' : '#dddddd'))
const spaceColor = computed(() => (isDark.value ? '#3b3636 ' : '#ffffff'))
const isSkeleton = ref<boolean>(true)
const generals = ref<IGeneral[]>([
  { label: '点赞人数', icon: 'zan', number: ref() },
  { label: '收藏人数', icon: 'sc', number: ref() },
  { label: '分享人数', icon: 'fx', number: ref() },
  { label: '评论人数', icon: 'pl', number: ref() }
])
onMounted(async () => {
  const result = await getGeneralData()
  const numbers: number[] = result.data.list
  numbers.forEach((item, index) => {
    generals.value[index].number = useAnimatedNumber(ref(item))
  })
  isSkeleton.value = false
})
</script>
<style lang="scss" scoped>
.skeleton {
  margin-bottom: 6px;
}
.body {
  height: 100%;
  :deep(.el-card__body) {
    padding: 0;
  }
  .title {
    position: relative;
    font-weight: bold;
    padding: 22px 0;
    padding-left: 16px;
    border-bottom: 1px solid v-bind(borderColor);
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
    :deep(.el-skeleton) {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .border {
      height: 160px;
      width: 1px;
      background: linear-gradient(180deg, v-bind(spaceColor) 0%, v-bind(centerColor) 50%, v-bind(spaceColor) 100%);
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
}
</style>
