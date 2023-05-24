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
            target: 'hovered'    // change state to hovered
          },
          INCREMENT: {
            actions: 'incrementCount'   // call action increment
          },
          DECREMENT: {
            actions: 'decrementCount'
          }
        }
      },
      hovered: {
        // The 'beeping' and alertData activity will take place as long as the machine is in the 'hovered' state
        activities: ['beeping'],
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
    },
    activities: {
      beeping: () => {
        // Start the beeping activity
        const interval = setInterval(() => console.log('BEEP!'), 1000);

        // Return a function that stops the beeping activity
        return () => clearInterval(interval);
      },
      alertData: () => {
        alert("ALERT !")
      }
    }
  },
)

