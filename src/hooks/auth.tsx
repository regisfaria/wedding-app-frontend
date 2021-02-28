import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  _id: {
    $oid: string;
  };
  name: string;
  username: string;
  imageUrl: string;
  privileges: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ALWedding:token');
    const user = localStorage.getItem('@ALWedding:user');

    if (token && user) {
      api.defaults.headers.authorization = token;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth', {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ALWedding:token', token);
    localStorage.setItem('@ALWedding:user', JSON.stringify(user));

    api.defaults.headers.authorization = token;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ALWedding:token');
    localStorage.removeItem('@ALWedding:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@ALWedding:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('use Auth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
