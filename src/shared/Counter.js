import React from 'react';
import { Button } from '@material-ui/core';

function Counter({ value, onIncrement, onDecrement }) {
  return (
    <div>
      Clicked:
      {' '}
      {value}
      {' '}
      times.
      {' '}
      <Button variant="outlined" onClick={onIncrement}>+</Button>
      {' '}
      <Button variant="outlined" onClick={onDecrement}>-</Button>
    </div>
  );
}

export default Counter;
