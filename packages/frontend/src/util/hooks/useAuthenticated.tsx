import { Role } from '@containers/Auth/store/types';
import { AppState } from '@store/RootReducer';

import { useSelector } from 'react-redux';

export function useAuthenticated(): [boolean, Role | null] {
  const isAuthenticated = useSelector<AppState, boolean>(
    state => state.auth.isAuthenticated
  );

  const role = useSelector<AppState, Role | null>(state => state.auth.role);

  return [isAuthenticated, role];
}
