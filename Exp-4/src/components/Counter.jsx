import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, selectCount } from '../store/slices/counterSlice';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="counter-section">
      <h3>Simple Counter (Redux)</h3>
      <div className="counter-display">
        <h1>{count}</h1>
      </div>
      <div className="counter-controls">
        <button onClick={() => dispatch(decrement())} className="btn-counter">
          ➖ Decrement
        </button>
        <button onClick={() => dispatch(reset())} className="btn-counter">
          🔄 Reset
        </button>
        <button onClick={() => dispatch(increment())} className="btn-counter">
          ➕ Increment
        </button>
      </div>
    </div>
  );
}

export default Counter;
