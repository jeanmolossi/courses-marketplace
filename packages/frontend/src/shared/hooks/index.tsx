import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toasts';
import { SocketProvider } from './Socket';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <ToastProvider>{children}</ToastProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default AppProvider;
