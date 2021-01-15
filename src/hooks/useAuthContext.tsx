import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = React.createContext<AppContextInterface>({
  currentUser: null, 
  getUserByEmail: null,
  signup: null, 
  submitUser: null,
  login: null,
  logout: null
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AppContextInterface {
  currentUser: any;
  getUserByEmail: any;
  signup: any;
  submitUser: any;
  login: any;
  logout: any;
}

interface AuthProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const [program, setProgram] = useState(localStorage.getItem('program') || '');

  const getUserByEmail = async function(email: string) {

    let userExists:boolean = false;

    await axios.get(`/api/users/${email}`).then(response => {
      console.log(response.data);
      response.data[0] ? userExists = true : userExists = false
    })

    return userExists;
  }

  const signup = function(firstname:string, lastname:string, email:string, password:string) {

    setFirstName(firstname);
    setLastName(lastname);
    localStorage.setItem('firstName', firstname);
    localStorage.setItem('lastName', lastname);
    console.log(firstname, lastname, email, password);

    return auth.createUserWithEmailAndPassword(email, password);
  }

  const submitUser = function(program:string) {

    setProgram(program);
    localStorage.setItem('program', program);
    // Call our API
    return axios.post('/api/users', {
      currentUser,
      program
    }).then(response => {
      console.log(response);
    })
    // .catch(error => {
    //   console.log('lolerror', error);
    // });

  }

  const login = function(email:string, password:string) {
    return auth.signInWithEmailAndPassword(email, password).then((firebaseObj: any) => {
      const uid = firebaseObj.user.uid;
      console.log('user from firebase', firebaseObj.user.uid);
      return axios.get(`/api/users/${uid}`)
      .then((response: any) => {
        const { first_name, last_name, program } = response.data;
        localStorage.setItem('firstName', first_name);
        localStorage.setItem('lastName', last_name);
        localStorage.setItem('program', program);
        setFirstName(first_name);
        setLastName(last_name);
        setProgram(program);
        console.log(first_name, last_name, program)
      })
    });
  }

  const logout = function() {
    setFirstName('');
    setLastName('');
    setProgram('');
    localStorage.clear();
    return auth.signOut();
  }

  useEffect(() => {
    console.log('in the useEffect', firstName, lastName, program);
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

  const value:AppContextInterface = {
    currentUser,
    getUserByEmail,
    signup,
    submitUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}