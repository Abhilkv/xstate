import { createMachine } from 'xstate'

export const LoadingMachine = createMachine(
  {
    id: 'LoadingData',
    initial: 'Loading',
    context: {
      count: 0
    },
    schema: {
      events: {} as { type: "DATA_LOADED" } | { type: "LOADING_FAILED" } | { type: "LOADING_FAILED" }
    },
    states: {
      Loading: {
        on: {
          DATA_LOADED: {
            target: 'Loaded'
          },
          LOADING_FAILED: {
            target: 'LoadingFailed'
          },
        }
      },
      Loaded: {
        on: {
          LOADING_FAILED: {
            target: 'LoadingFailed'
          }
        }
      },
      LoadingFailed: {
        on: {
          DATA_LOADED: {
            target: 'Loaded'
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

