import React, { useContext, useState, useEffect, ReactChild, ReactNode } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext<AppContextInterface>({
  currentUser: null, 
  signup: null, 
  logout: null
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AppContextInterface {
  currentUser: any,
  signup: any,
  logout: any
}

interface AuthProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);


  const signup = function(email:string, password:string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const logout = function() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value:AppContextInterface = {
    currentUser,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}