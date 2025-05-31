import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';
import './styles.css';
const App = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="app">
            <h1>Electron + React + Redux Toolkit</h1>
            <div className="counter">
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>+</button>
           </div>
        </div>
    );
};
export default App;
                                        
