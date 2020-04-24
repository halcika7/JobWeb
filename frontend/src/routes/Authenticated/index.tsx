import React, { ComponentClass, FC } from 'react';

// navigation components and types
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

// hooks
import { useAuthenticated } from 'util/hooks/useAuthenticated';

interface Props extends RouteProps {
  component: ComponentClass<RouteComponentProps> | FC<RouteComponentProps>;
}

const AuthenticatedRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const [isAuthenticated] = useAuthenticated();

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default React.memo(AuthenticatedRoute);
