import { createMachine } from 'xstate'

export const LoadingMachine = createMachine(
  {
    id: 'LoadingData',
    initial: 'Loading',
    context: {
      data: {},
      data2: {}
    },
    schema: {
      events: {} as { type: "DATA_LOADED", data?: Record<string, any> } | { type: "LOADING_FAILED", data?: any } ,
      services: {} as {
        loadinfDataService: {
          // data: string[]
          data: Record<string, any>
        }
      }
    },
    tsTypes: {} as import("./loadingList.typegen").Typegen0,
    states: {
      Loading: {
        on: {
          DATA_LOADED: {
            target: 'Loaded',
            actions: "storeData1"    // performs the action when moved to this state  (Performs synchronously )
          },
          LOADING_FAILED: {
            target: 'LoadingFailed'
          },
        },
        invoke: {                   // defining services to do asynchronous operation
          src: "loadinfDataService",   // this wont get triggered since after the first fetch from useEffect the state changed to Loaded
          onDone: {
            target: "Loaded",
            actions: "storeDetails"
          },
          onError: {
            target: "LoadingFailed",
            actions: "logError"
          }
        }
      },
      Loaded: {
        on: {
          LOADING_FAILED: {
            target: 'LoadingFailed'
          }
        },
        invoke: {                   // defining services to do asynchronous operation
          src: "loadinfDataService",
          onDone: {
            target: "Loaded",
            actions: "storeDetails"
          },
          onError: {
            target: "LoadingFailed",
            actions: "logError"
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
      logError: () => {
        console.warn('error')
      },
      storeData1: (context, event) => {
        console.log(event?.data, "action1")
        context.data = { ...event?.data};
      },
      storeDetails: (context, event) => {
        console.log(event?.data, 'action2')
        context.data2 = { ...event?.data};
        // return {
        //   errorMessage: (event.data as Error).message,
        // };
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

