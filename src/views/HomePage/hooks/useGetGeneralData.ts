import type { Ref } from 'vue'
import { getGeneralData } from '@/service/home'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
interface IGeneral {
  label: string
  icon: string
  number?: number
}
export function useGetGeneralData(): { isSkeleton: Ref<boolean>; generals: Ref<IGeneral[]> } {
  const isSkeleton = ref<boolean>(true)
  const generals = ref<IGeneral[]>([
    { label: '点赞人数', icon: 'zan' },
    { label: '收藏人数', icon: 'sc' },
    { label: '分享人数', icon: 'fx' },
    { label: '评论人数', icon: 'pl' }
  ])
  getGeneralData().then((result) => {
    const numbers: number[] = result.data.list
    numbers.forEach((item, index) => {
      generals.value[index].number = useAnimatedNumber(item) as unknown as number
    })
    isSkeleton.value = false
  })
  return {
    isSkeleton,
    generals
  }
}
