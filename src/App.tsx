import logo from './logo.svg';
import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { MouseMachine } from './machines/hover';
import { LoadingMachine } from './machines/loadingList';
import './App.css';
import React from 'react';

const App = () => {
  const [state, MouseSend] = useMachine(MouseMachine);
  const [LoadingState, LoadingSend] = useMachine(LoadingMachine, {
    services: {
      loadinfDataService: async () => {
        // return ["Data"]
        return await fetchData2();
      }
    }
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => { console.log('data1'); LoadingSend({ type: "DATA_LOADED",  data: json})}).catch(() => {
        LoadingSend({ type: "LOADING_FAILED", data: 'Data Loading failed ' });
      })
  }, []);

  const fetchData2 = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/todos/2')
    .then(response => response.json())
    .then(json => {  console.log('data2'); return json}).catch((err) => err)
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <span>{JSON.stringify(LoadingState.context.data)} 1</span>
        <span>{JSON.stringify(LoadingState.context.data2)} data2</span>
        <div>
          <div style={{ border: '1px solid red', padding: '10px' }}>
            <button
              onClick={() => {
                MouseSend('INCREMENT');
              }}
            >
              Increment
            </button>
            <h1>Count: {state.context.count}</h1>
            <button
              onClick={() => {
                MouseSend('DECREMENT');
              }}
            >
              Decrement
            </button>
          </div>
        </div>
        <div style={{ border: '1px solid green', margin: '5px', padding: '10px'}}>
          <h1>{JSON.stringify(state.value)}</h1>
          <button
            onMouseEnter={() => {
              MouseSend('MOUSEOVER');
            }}
            onMouseLeave={() => {
              MouseSend({ type: 'MOUSEOUT' });
            }}
          >
            OVER Mouse
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;