import { useState } from 'react';
import { useSubscribe } from '.';
import { ObservableFactory } from './utils';

/**
 * Subscribe to an Observable and return an stateful tuple containing the last
 * value emitted, the error (if any) and a boolean indicating if the Observable
 * has completed.
 */
export function useSubscription<T, TError = any>(
  observableFactory: ObservableFactory<T>,
): readonly [T | null, TError | undefined, boolean];

export function useSubscription<T, TError = any>(
  observableFactory: ObservableFactory<T>,
  defaultValue?: T | (() => T),
): readonly [T, TError | undefined, boolean];

export function useSubscription<T, TError = any>(
  observableFactory: ObservableFactory<T>,
  defaultValue?: T | (() => T),
): readonly [T | null, TError | undefined, boolean] {
  const [value, setValue] = useState<T | null>(defaultValue ?? null);
  const [error, setError] = useState<TError | undefined>(undefined);
  const [complete, setComplete] = useState<boolean>(false);

  useSubscribe(observableFactory, {
    next: (value) => setValue(value),
    error: (error: any) => setError(error),
    complete: () => setComplete(true),
  });

  return [value, error, complete] as const;
}
