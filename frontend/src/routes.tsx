import {
  BrowserRouter,
  Route,
  Routes as RouteGroup,
  Navigate,
} from 'react-router-dom';

import { Channels } from './screens/Channels';
import { Chat } from './screens/Chat';
import { Login } from './screens/Login';

import { useChannelContext } from './hooks';
import { useCallback } from 'react';

interface RouteProps {
  children: React.ReactNode;
}

export function Routes() {
  const { userName } = useChannelContext();

  const PrivateRoute = useCallback(
    ({ children }: RouteProps) => {
      if (!userName) {
        return <Navigate to="/login" />;
      }
      return <>{children}</>;
    },
    [userName]
  );

  const RouteNotFound = useCallback(() => {
    const path = userName ? '/chat' : '/login';

    return <Navigate to={path} replace />;
  }, [userName]);

  return (
    <BrowserRouter>
      <RouteGroup>
        <Route path="/login" element={<Login />} />

        <Route
          path="/chat/:channelId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/channels"
          element={
            <PrivateRoute>
              <Channels />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<RouteNotFound />} />
      </RouteGroup>
    </BrowserRouter>
  );
}
