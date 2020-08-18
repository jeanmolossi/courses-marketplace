import React, { createContext, useContext, useEffect, useMemo } from 'react';
import SocketIOClient, { Socket } from 'socket.io-client';

import { useAuth } from './Auth';

interface SocketContextData {
  socket: typeof Socket;
}

const socketContext = createContext({} as SocketContextData);

const SocketProvider: React.FC = ({ children }) => {
  const { user, setUser } = useAuth();

  // const [socketState, setSocketState] = useState({} as typeof Socket);

  const socketState = useMemo(
    () =>
      SocketIOClient('http://localhost:3333', {
        query: { userId: user.id },
      }),

    [user.id],
  );

  useEffect(() => {
    socketState.on('connect', () => {
      const status = socketState.connected ? 'Online' : 'Offline';
      setUser(state => ({ ...state, status }));
    });
    socketState.on('reconnect', () => {
      const status = socketState.connected ? 'Online' : 'Offline';
      setUser(state => ({ ...state, status }));
    });
    socketState.on('disconnect', () => {
      const status = socketState.connected ? 'Online' : 'Offline';
      setUser(state => ({ ...state, status }));
    });
  }, [setUser, socketState]);

  return (
    <socketContext.Provider value={{ socket: socketState }}>
      {children}
    </socketContext.Provider>
  );
};

function useSocket(): SocketContextData {
  const context = useContext(socketContext);

  if (!context) throw new Error('You must use socket inside a provider');
  return context;
}

export { SocketProvider, useSocket };
