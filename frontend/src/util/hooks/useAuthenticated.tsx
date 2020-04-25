// types
import { Role } from '@pages/Auth/store/types';
import { AppState } from '@store/RootReducer';

// hooks
import { useSelector } from 'react-redux';

export function useAuthenticated() {
  const isAuthenticated = useSelector<AppState>(
    state => state.auth.isAuthenticated
  ) as boolean;
  const role = useSelector<AppState>(state => state.auth.role) as Role;

  return [isAuthenticated, role];
}
