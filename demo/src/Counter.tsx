import React, { FC } from 'react';
import { useObservable, useSubscription } from 'react-hooks-rxjs';
import { bufferCount, bufferTime, interval, take, throttleTime } from 'rxjs';

const Counter: FC = () => {
  const counter$ = useObservable(() => interval(5).pipe(take(1000)));

  const [count, error, completed] = useSubscription(() => counter$.pipe(throttleTime(500)));
  const [count500] = useSubscription(() => counter$.pipe(throttleTime(500)));
  const [count1000] = useSubscription(() => counter$.pipe(throttleTime(1000)));
  const [countBufferedTime] = useSubscription(() => counter$.pipe(bufferTime(100)));
  const [countBufferedCount] = useSubscription(() => counter$.pipe(bufferCount(10)));

  return (
    <div className="App">
      <div>{`count: ${count}`}</div>
      <div>{`error: ${error}`}</div>
      <div>{`completed: ${completed}`}</div>
      <div>{`count (throttle 500ms): ${count500}`}</div>
      <div>{`count (throttle 1sec): ${count1000}`}</div>
      <div>{`count (buffered every 300ms): ${countBufferedTime}`}</div>
      <div>{`count (buffered every 10 emits): ${countBufferedCount}`}</div>
    </div>
  );
};

export default Counter;
