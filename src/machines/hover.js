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
            target: 'hovered',    // change state to hovered,
            actions: "sampleData"
          },
          INCREMENT: {
            actions: 'incrementCount'   // call action increment
          },
          DECREMENT: {
            actions: 'decrementCount'
          }
        }
      },
      idle: {},
      hovered: {
        // The 'beeping' and alertData activity will take place as long as the machine is in the 'hovered' state
        activities: ['beeping'],
        aftter: {
          500: {
            target: "idle"
          }
        },
        on: {
          MOUSEOUT: {
            target: 'notHovered'
          }
        },


        // hiearichal state (sTATE WITH IN AN ANOTHER STATE )
        initial: 'notClicked',
        states: {
          notClicked: {
            on: {
              MOUSECLICKED: {
                target: 'clicked'    // change state to clicked
              }
            }
          },
          clicked: {
            on: {}
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
      },
      sampleData: (context, event) => {
        console.log('data', event.data);
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



// send          => to dispatch a type and data 
// target       => to specify desired target state on type dispatch
// actions      => an operation need to be performed when we moved to one state
// activities   => to do an action periodically when its in a state
// services     => to perform some action async
// after         
