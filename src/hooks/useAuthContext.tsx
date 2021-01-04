import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import axios from 'axios';
import { truncateSync } from 'fs';
import { RepeatOneSharp } from '@material-ui/icons';
import { StepConnector } from '@material-ui/core';

const AuthContext = React.createContext<AppContextInterface>({
  currentUser: null, 
  getUserByEmail: null,
  signup: null, 
  submitUser: null,
  logout: null
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AppContextInterface {
  currentUser: any,
  getUserByEmail: any,
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

  const getUserByEmail = async function(email: string) {

    let userExists:boolean = false;

    await axios.get(`/api/users/${email}`).then(response => {
      console.log(response.data);
      response.data[0] ? userExists = true : userExists = false
    })

    return userExists;
  }

  const signup = async function(email:string, password:string, program:string) {

    // return auth.createUserWithEmailAndPassword(email, password);

    // console.log('current', currentUser);
    console.log(email, program);

    return auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('after creation', currentUser)
      axios.post('/api/users', {
        user: currentUser,
        program
      })
    })

    // const promises:any = [
    //   axios.post('/api/users', {
    //     user: currentUser,
    //     program
    //   }),
    //   auth.createUserWithEmailAndPassword(email, password)
    // ];

    // return Promise.all(promises).then(() => {
    //   setCurrentUser({
    //     ...currentUser,
    //     program
    //   })
    // })
  }

  const submitUser = function(program:string) {

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
    getUserByEmail,
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