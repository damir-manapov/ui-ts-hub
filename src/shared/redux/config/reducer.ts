import { IConfigReducerState, TConfigAction } from './types';
import { ConfigActions } from './actions';

const initState = {} as IConfigReducerState;

export function configReducer(
  state = initState,
  action: TConfigAction,
) {
  return ConfigActions.match(action, {
    default: () => state,
  });
}
