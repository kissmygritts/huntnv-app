import { ref } from 'vue'
import { createMachine } from '../lib/fsm.js'

const machineDef = {
  initial: 'list',
  history: [],
  states: {
    list: {
      transitions: {
        toggle: { target: 'map' },
        openFilters: { target: 'filters' },
        toBoth: { target: 'both' }
      }
    },
    map: {
      transitions: {
        toggle: { target: 'list' },
        openFilters: { target: 'filters' },
        toBoth: { target: 'both' }
      }
    },
    both: {
      transitions: {
        toList: { target: 'list' }
      }
    },
    filters: {
      transitions: {
        close: {
          target(ctx) {
            const value = ctx.history.pop()
            return value
          },
          toBoth: { target: 'both' }
        }
      }
    }
  }
}
const layoutMachine = createMachine(machineDef)

const visible = ref(false)
const layout = ref(layoutMachine.value)
const previousLayout = ref('')

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

  // mobile layout state machine transitions
  const transitionLayout = (event) => {
    previousLayout.value = layout.value
    const nextValue = layoutMachine.transition(layout.value, event)
    layout.value = nextValue
    console.log({
      layout: layout.value,
      previous: previousLayout.value,
      layoutMachine
    })
  }

  return {
    visible,
    open,
    close,
    toggle,

    // mobile layout state machine
    layout,
    previousLayout,
    transitionLayout
  }
}
