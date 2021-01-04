import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = React.createContext<AppContextInterface>({
  currentUser: null, 
  signup: null, 
  submitUser: null,
  logout: null
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AppContextInterface {
  currentUser: any,
  signup: any,
  submitUser: any
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

  const submitUser = function(program:string) {

    console.log(program);
    console.log({
      ...currentUser,
      program
    })


    // console.log('user before api call', currentUser);

    setCurrentUser({
      ...currentUser,
      program
    })

    console.log('before the api call', currentUser);

    // Call our API
    return axios.post('/api/users', {
      user: currentUser,
      program
    }).then(response => {
      console.log(response);
      setCurrentUser({
        ...currentUser,
        program
      })
    })
    // .catch(error => {
    //   console.log('lolerror', error);
    // });

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
    submitUser,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}