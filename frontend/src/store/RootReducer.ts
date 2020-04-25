import { combineReducers, Reducer } from 'redux';

// reducers
import { AuthReducer as auth, AuthState } from '@pages/Auth/store/reducer';
import { CountryReducer as country, CountryState } from '@country/reducer';

export interface AppState {
  country: CountryState;
  auth: AuthState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  country,
  auth,
} as any);
