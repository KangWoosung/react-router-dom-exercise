/*  2024-07-19 10:22:35


*/

import { createContext, useContext, useState } from "react";

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles?: string[];
};

export type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  signin: (user: UserType) => void;
  signout: () => void;
};

const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  signin: () => {},
  signout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signin = (userData: UserType) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
