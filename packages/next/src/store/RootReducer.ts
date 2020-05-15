import { combineReducers, Reducer } from 'redux';

// reducers
import { AuthReducer as auth, AuthState } from '@containers/Auth/store/reducer';
import { CountryReducer as country, CountryState } from '@country/reducer';
import {
  ContactReducer as contact,
  ContactMessageState,
} from '@containers/Contact/store/reducer';

export interface AppState {
  country: CountryState;
  auth: AuthState;
  contact: ContactMessageState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  country,
  auth,
  contact,
});
