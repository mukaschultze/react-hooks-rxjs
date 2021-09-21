import { useEffect } from 'react';
import { Subject } from 'rxjs';
import { useConstant } from './utils';

/**
 * Creates a new Subject that completes on component unmount
 */
export function useSubject<T>(): Subject<T> {
  const subject = useConstant(() => new Subject<T>());
  useEffect(() => () => subject.complete(), [subject]);
  return subject;
}
