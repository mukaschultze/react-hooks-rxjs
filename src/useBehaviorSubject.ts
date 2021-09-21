import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useSubscribe } from '.';
import { actionIsFunction, useConstant } from './utils';

/**
 * Returns a tuple containing a stateful value, a dispatch function and a
 * BehaviorSubject.
 * This should work as a drop-in replacement for useState with the minor
 * difference that the set state action returns the last value from the Subject
 * instead of the last value of React's state.
 */
export function useBehaviorSubject<T>(
  defaultValue: T | (() => T),
): readonly [T, Dispatch<SetStateAction<T>>, BehaviorSubject<T>] {
  const [value, setValue] = useState(defaultValue);
  const subject = useConstant(() => new BehaviorSubject<T>(value));

  useEffect(() => () => subject.complete(), [subject]);
  useSubscribe(() => subject, { next: (value) => setValue(value) });

  const dispatch: Dispatch<SetStateAction<T>> = (action) =>
    subject.next(actionIsFunction(action) ? action(subject.value) : action);

  return [value, dispatch, subject] as const;
}
