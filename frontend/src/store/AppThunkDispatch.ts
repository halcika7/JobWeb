import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
