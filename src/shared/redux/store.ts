import {
  createStore,
  Store,
  applyMiddleware,
  combineReducers,
  Middleware,
} from 'redux';
import { IReduxState } from './types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configReducer } from './config';

const reducers = combineReducers<IReduxState>({
  config: configReducer,
});

/**
 * Initializes redux store.
 * @param initialState
 */
export const createReduxStore = (
  initialState: IReduxState,
): Store<IReduxState> => {
  const middleware: Middleware[] = [];

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
};
