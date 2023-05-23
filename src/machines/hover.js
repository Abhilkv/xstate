import { createMachine } from 'xstate'

export const MouseMachine = createMachine(
  {
    id: 'mouse',
    initial: 'notHovered',
    context: {
      count: 0
    },
    states: {
      notHovered: {
        on: {
          MOUSEOVER: {
            target: 'hovered'
          },
          INCREMENT: {
            actions: 'incrementCount'
          },
          DECREMENT: {
            actions: 'decrementCount'
          }
        }
      },
      hovered: {
        on: {
          MOUSEOUT: {
            target: 'notHovered'
          }
        }
      }
    }
  },
  {
    actions: {
      incrementCount: context => {
        context.count++
      },
      decrementCount: context => {
        context.count--
      }
    }
  }
)
