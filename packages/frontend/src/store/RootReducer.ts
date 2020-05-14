import { combineReducers, Reducer } from 'redux';

// reducers
import { AuthReducer as auth, AuthState } from '@pages/Auth/store/reducer';
import { CountryReducer as country, CountryState } from '@country/reducer';
import { ContactReducer as contact, ContactMessageState  } from '@pages/Contact/store/reducer';

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
