import { countReset } from 'console';
import React, { useState } from 'react';

export default function TestComponent() {

  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(prev => prev + 1)}>
        Click Me
      </button>
    </div>
  )
}
