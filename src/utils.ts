import { SetStateAction, useMemo } from 'react';
import { ObservableInput } from 'rxjs';

export type ObservableFactory<T> = () => ObservableInput<T>;

export function useConstant<T>(factory: () => T): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(), []);
}

export function actionIsFunction<T>(action: SetStateAction<T>): action is (prevState: T) => T {
  return typeof action === 'function';
}
