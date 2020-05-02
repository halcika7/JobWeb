import React, { ComponentClass, FC } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

import { useAuthenticated } from '@hooks/useAuthenticated';

interface Props extends RouteProps {
  restricted?: boolean;
  redirectTo?: string;
  component: ComponentClass<RouteComponentProps> | FC<RouteComponentProps>;
}

const PublicRoute: FC<Props> = ({
  component: Component,
  restricted = false,
  redirectTo = '/404',
  ...rest
}) => {
  const [isAuthenticated] = useAuthenticated();

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) => {
        return isAuthenticated && restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default React.memo(PublicRoute);
