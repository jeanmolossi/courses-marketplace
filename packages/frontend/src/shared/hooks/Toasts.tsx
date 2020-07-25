import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '@globalComponents/ToastContainer';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContext {
  addToast(data: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const toastContext = createContext<ToastContext>({} as ToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>(
    [] as ToastMessage[],
  );

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </toastContext.Provider>
  );
};

function useToast(): ToastContext {
  const context = useContext(toastContext);

  if (!context) throw new Error('You must use useToast inside a Provider');
  return context;
}

export { useToast, ToastProvider };
