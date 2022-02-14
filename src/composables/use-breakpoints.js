import { onMounted, reactive } from 'vue'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

const breakpoints = reactive({ w: 0, h: 0, is: 'xs' })

const sm = (val) => val >= screens.sm && val < screens.md
const md = (val) => val >= screens.md && val < screens.lg
const lg = (val) => val >= screens.lg && val < screens.xl
const xl = (val) => val >= screens.xl && val < screens['2xl']
const xxl = (val) => val >= screens['2xl']

const getBreakpoint = (w) => {
  if (sm(w)) return 'sm'
  else if (md(w)) return 'md'
  else if (lg(w)) return 'lg'
  else if (xl(w)) return 'xl'
  else if (xxl(w)) return '2xl'
  else return 'all'
}

const setBreakpoint = () => {
  breakpoints.w = window.innerWidth
  breakpoints.h = window.innerHeight
  breakpoints.is = getBreakpoint(window.innerWidth)
}

const useBreakpoints = () => {
  onMounted(() => {
    setBreakpoint()
    window.addEventListener('resize', () => {
      setBreakpoint()
    })
  })

  return {
    breakpoints
  }
}

export default useBreakpoints
