import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

// Creating the initial state of the Context
const AuthContext = React.createContext<AppContextInterface>({
  currentUser: {
    user: {},
    firstName: '',
    lastName: '',
    program: ''
  }, 
  getUserByEmail: null,
  firebaseSignUp: null, 
  submitApplicationUser: null,
  login: null,
  logout: null
});

export function useAuth() {
  return useContext(AuthContext);
}

// Interfaces
export interface User {
  user: any;
  firstName: string;
  lastName: string;
  program: string;
}

interface AppContextInterface {
  currentUser: User;
  getUserByEmail: any;
  firebaseSignUp: any;
  submitApplicationUser: any;
  login: any;
  logout: any;
}

interface AuthProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProps) {

  // State
  const [currentUser, setCurrentUser] = useState<any>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const [program, setProgram] = useState(localStorage.getItem('program') || '');
  const [error, setError] = useState('');

  const getUserByEmail = async function(email: string) {

    let userExists:boolean = false;

    await axios.get(`/api/users/${email}`).then(response => {
      response.data[0] ? userExists = true : userExists = false
    });
    return userExists;
  }

  const firebaseSignUp = function(firstName:string, lastName:string, email:string, password:string) {

    setFirstName(firstName);
    setLastName(lastName);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    console.log(firstName, lastName, email, password);

    return auth.createUserWithEmailAndPassword(email, password);
  }

  const submitApplicationUser = function(program: string) {

    setProgram(program);
    localStorage.setItem('program', program);
    setLoggedIn(true);
    
    // Consuming our users endpoint
    return axios.post('/api/users', {
      currentUser,
      program
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      setError(error);
    });
  }

  const login = function(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password).then((firebaseObj: any) => {
      const uid = firebaseObj.user.uid;
      return axios.get(`/api/users/${uid}`)
      .then((response: any) => {
        setLoggedIn(true);
        const { firstName, lastName, program } = response.data;

        // Storing user info to persist state on refresh
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('program', program);
        setFirstName(firstName);
        setLastName(lastName);
        setProgram(program);
      })
    });
  }

  const logout = function() {
    setLoggedIn(false);
    setFirstName('');
    setLastName('');
    setProgram('');
    localStorage.clear();
    return auth.signOut();
  }

  // Handles currentUser object state by subscribing to changes to said object
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser({
        user,
        firstName,
        lastName,
        program
      });
      setLoading(false);
    });

    return unsubscribe;
  }, [firstName, lastName, program]);

  // All user auth functionality accessible by the entire application
  const value:AppContextInterface = {
    currentUser,
    getUserByEmail,
    firebaseSignUp,
    submitApplicationUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}