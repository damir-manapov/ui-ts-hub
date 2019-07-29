import { createReduxStore, IReduxState } from '../redux';
import { Store } from 'redux';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

/**
 * Gets or creates new redux store.
 * @param initialState
 */
export function getOrCreateStore(
  initialState: IReduxState,
): Store<IReduxState> {
  if (isServer) {
    return createReduxStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createReduxStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}
