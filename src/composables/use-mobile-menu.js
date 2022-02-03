import { ref } from 'vue'

const visible = ref(false)

export default function useMobileMenu() {
  const open = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }
  const toggle = () => {
    visible.value = !visible.value
  }

  return {
    visible,
    open,
    close,
    toggle
  }
}
