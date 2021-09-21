import { useEffect } from 'react';
import { PartialObserver } from 'rxjs';
import { useObservable } from '.';
import { ObservableFactory } from './utils';

/**
 * Subscribe to the emissions of an Observable, similar to useEffect. This
 * unsubscribes and re-subscribes every time either the 'observableFactory' or
 * 'partialObserver' changes and unsubscribes on unmount.
 */
export function useSubscribe<T>(observableFactory: ObservableFactory<T>, partialObserver?: PartialObserver<T>): void {
  const observable = useObservable(observableFactory);

  useEffect(() => {
    const subscription = observable.subscribe(partialObserver);
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observable]);
}
