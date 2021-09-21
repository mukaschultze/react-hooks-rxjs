import { from, Observable } from 'rxjs';
import { ObservableFactory, useConstant } from './utils';

/**
 * Create an Observable from an observable factory. This is needed when you need
 * to create a new observable or pipe an existing one inside a component function.
 */
export function useObservable<T>(observableFactory: ObservableFactory<T>): Observable<T> {
  return useConstant(() => from(observableFactory()));
}
