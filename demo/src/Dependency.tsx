import React, { FC, useState } from 'react';
import { useFromDependency, useSubscribe } from 'react-hooks-rxjs';

const Dependency: FC = () => {
  const [count, setCount] = useState(0);
  const obs$ = useFromDependency(count);

  useSubscribe(() => obs$, { next: (value) => console.log('Dependency did change, new value:', value) });

  return <button onClick={() => setCount((prev) => prev + 1)}>Check console</button>;
};

export default Dependency;
