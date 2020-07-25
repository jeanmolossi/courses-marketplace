import React, {
  createContext,
  useMemo,
  useContext,
  useCallback,
  useState,
} from 'react';

import api from '@shared/services/api';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  token: string;
}

interface AuthContextData {
  signIn(data: LoginData): Promise<void>;
  signOut(): void;
  user: User;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const hasUser = localStorage.getItem('@CodeLearnMarketplace:user');
    if (hasUser) return JSON.parse(hasUser);

    return {} as User;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get<User[]>(`users`, {
      params: {
        email,
        password,
      },
    });

    const userData = response.data[0];
    if (!response.data.length) throw new Error('You cannot login');

    localStorage.setItem(
      '@CodeLearnMarketplace:user',
      JSON.stringify(userData),
    );
    setUser({
      id: userData.id,
      name: userData.name,
      avatar: userData.avatar,
      token: userData.token,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CodeLearnMarketplace:user');
    setUser({} as User);
  }, []);

  const contextValues = useMemo(() => {
    return {
      signIn,
      signOut,
    };
  }, [signIn, signOut]);

  return (
    <authContext.Provider value={{ user, ...contextValues }}>
      {children}
    </authContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('You need use the hook useAuth inside a Provider');
  }
  return context;
}

export { AuthProvider, useAuth };
