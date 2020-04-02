import { combineReducers, Reducer } from 'redux';

export interface AppState {
  someState: any[];
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  someState: [],
} as any);
