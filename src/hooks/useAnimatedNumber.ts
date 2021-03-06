import type { Ref, WritableComputedRef } from 'vue'
import gsap from 'gsap'
function useAnimatedNumber(number: Ref<number> | number, duration = 0.5, toFixed = 0): WritableComputedRef<number> {
  const refNumber = ref<number>(unref(number))
  const targetNumber = ref(0)
  const animatedNumber = computed<number>({
    get() {
      return targetNumber.value.toFixed(toFixed) as unknown as number
    },
    set(val) {
      return val
    }
  })
  watch(
    () => refNumber.value,
    (newValue) => {
      gsap.to(targetNumber, { duration, value: newValue })
    },
    { immediate: true }
  )
  return animatedNumber
}

export { useAnimatedNumber }
