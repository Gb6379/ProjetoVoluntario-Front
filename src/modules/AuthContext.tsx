import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (token: string) => void;
  getToken: () => Promise<string>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('access_token', token);
  };


  const getToken = async (): Promise<string> => {
    const token = sessionStorage.getItem('access_token') || '';
    return token;
  };

  const values = React.useMemo(() => ({ isAuthenticated, login, getToken }), [
    isAuthenticated,
  ]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('8b3749c5-4dde-48be-be53-959050de0d09.33440fc6-b7c7-412c-bb73-0e70b0198d5a-login.windows.net-idtoken-2eb9eafb-83b3-4edd-a816-df0d0d12d0a5-6298c784-3216-458a-93d0-e5f28d20a3d2---')!)?.secret;
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { useAuth };

export class AuthModule {
 
    async logout(): Promise<void> {
        // Remover o access_token do Session Storage
        sessionStorage.removeItem('access_token');
        // Redirecionar para a página localhost:3000/
        //window.location.href = 'https://app-compensacaoapi.azurewebsites.net/auth/aad';
      }
}