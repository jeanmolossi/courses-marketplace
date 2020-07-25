import React, { ComponentType } from 'react';
import {
  RouteProps as DOMRouteProps,
  Route as DOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '@hooks/Auth';

interface RouteProps extends DOMRouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <DOMRoute
      {...rest}
      render={({ location }) => {
        return !!user?.name === isPrivate ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
