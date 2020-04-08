import { combineReducers, Reducer } from 'redux';
import {
  RegisterState,
  RegisterReducer,
} from 'pages/Auth/Register/store/RegisterReducer';
import { CountryState, CountryReducer } from './country/CountryReducer';

export interface AppState {
  country: CountryState;
  register: RegisterState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  country: CountryReducer,
  register: RegisterReducer,
} as any);
