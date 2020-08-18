import React, {
  createContext,
  useMemo,
  useContext,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import api from '@shared/services/api';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email?: string;
  status?: 'Online' | 'Offline';
  avatarURL: string;
}

interface SessionData {
  user: User;
  token: string;
}

interface AuthContextData {
  signIn(data: LoginData): Promise<void>;
  signOut(): void;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const hasUser = localStorage.getItem('@CodeLearnMarketplace:user');
    let token = localStorage.getItem('@CodeLearnMarketplace:token');

    if (!token) return {} as User;

    token = JSON.parse(token);

    if (hasUser) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return JSON.parse(hasUser);
    }

    return {} as User;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<SessionData>(`sessions/create`, {
      email,
      password,
    });

    const { user: userdata, token } = response.data;
    if (!response.data) throw new Error('You cannot login');

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem(
      '@CodeLearnMarketplace:user',
      JSON.stringify(userdata),
    );
    localStorage.setItem('@CodeLearnMarketplace:token', JSON.stringify(token));
    setUser({
      id: userdata.id,
      name: userdata.name,
      avatarURL: userdata.avatarURL,
      status: 'Online',
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CodeLearnMarketplace:user');
    setUser({} as User);
  }, []);

  const contextValues = useMemo(() => {
    return {
      setUser,
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
