import { computed, watch, ref, Ref } from 'vue'
import gsap from 'gsap'
function useAnimatedNumber(number: Ref<number>, duration: number = 0.5, toFixed: number = 0): Ref<number> {
  const targetNumber = ref<number>(0)
  const animatedNumber = computed({
    get() {
      return targetNumber.value.toFixed(toFixed)
    },
    set(val) {
      return val
    }
  })
  watch(
    () => number.value,
    (newValue) => {
      gsap.to(targetNumber, { duration, value: newValue })
    },
    { immediate: true }
  )
  return animatedNumber as Ref<number>
}

export { useAnimatedNumber }
