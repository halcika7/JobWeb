import { combineReducers, Reducer } from 'redux';

// reducers
import { AuthReducer as auth, AuthState } from './auth';
import { CountryReducer as country, CountryState } from './country';
import { ContactReducer as contact, ContactMessageState } from './contact';

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
