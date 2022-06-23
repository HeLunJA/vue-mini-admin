import type { WritableComputedRef, Ref } from 'vue'
import { getGeneralData } from '@/service/home'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
interface IGeneral<T> {
  label: string
  icon: string
  number: WritableComputedRef<T> | null
}
export function useGetGeneralData(): { isSkeleton: Ref<boolean>; generals: Ref<IGeneral<number>[]> } {
  const isSkeleton = ref<boolean>(true)
  const generals = ref<IGeneral<number>[]>([
    { label: '点赞人数', icon: 'zan', number: null },
    { label: '收藏人数', icon: 'sc', number: null },
    { label: '分享人数', icon: 'fx', number: null },
    { label: '评论人数', icon: 'pl', number: null }
  ])
  onMounted(async () => {
    const result = await getGeneralData()
    const numbers: number[] = result.data.list
    numbers.forEach((item, index) => {
      generals.value[index].number = useAnimatedNumber(item) as unknown as number
    })
    isSkeleton.value = false
  })
  return {
    isSkeleton,
    generals: generals as Ref<IGeneral<number>[]>
  }
}
