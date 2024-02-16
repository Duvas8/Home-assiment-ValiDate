import React, { createContext, useState, ReactNode } from "react";

interface User {
  _id: any;
  // Define the structure of the user data
  // This will depend on your user data model
  id: number;
  email: string;
  selfDepiction: string;
  // Add more properties as needed
}

interface AuthContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: {} as User,
  setCurrentUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
