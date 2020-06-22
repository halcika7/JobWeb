import { AppState, useSelector, Types } from '@job/redux';

export function useAuthenticated(): [boolean, Types.Role | null] {
  const isAuthenticated = useSelector<AppState, boolean>(
    state => state.auth.isAuthenticated
  );

  const role = useSelector<AppState, Types.Role | null>(
    state => state.auth.role
  );

  return [isAuthenticated, role];
}
