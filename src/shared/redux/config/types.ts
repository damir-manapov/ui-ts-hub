import { IClientConfig } from '../../types';
import { UnionOf } from 'unionize';
import { ConfigActions } from './actions';

export interface IConfigReducerState extends IClientConfig {
}

export type TConfigAction = UnionOf<typeof ConfigActions>;
