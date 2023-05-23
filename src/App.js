import logo from './logo.svg'
import { useMachine, interpret } from '@xstate/react'

import { MouseMachine } from './machines/hover'
import './App.css'

function App () {
  const [state, send] = useMachine(MouseMachine)

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <div style={{ border: '1px solid red', padding: '10px'}}>
            <button
              onClick={() => {
                send('INCREMENT')
              }}
            >
              Increment
            </button>
            <h1>Count: {state.context.count}</h1>
            <button
              onClick={() => {
                send('DECREMENT')
              }}
            >
              Decrement
            </button>
          </div>
        </div>
        <h1>{JSON.stringify(state.value)}</h1>
        <button
          onMouseEnter={() => {
            send('MOUSEOVER')
          }}
          onClick={() => {
            send('INCREMENT')
          }}
          onMouseLeave={() => {
            send({ type: 'MOUSEOUT' })
          }}
        >
          OVER Mouse
        </button>
      </header>
    </div>
  )
}

export default App
