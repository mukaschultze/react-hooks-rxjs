import { useEffect } from 'react';
import { Observable } from 'rxjs';
import { useObservable, useSubject } from '.';

/**
 * Create an Observable that emits when a React dependency changes and completes
 * on component unmount
 */
export function useFromDependency<T>(dependency: T): Observable<T> {
  const sub = useSubject<T>();
  const obs = useObservable(() => sub.asObservable());

  useEffect(() => sub.next(dependency), [dependency, sub]);

  return obs;
}
