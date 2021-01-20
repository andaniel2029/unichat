import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

const AppDataContext = React.createContext();

export function useAppData() {
  return useContext(AppDataContext);
}


export function AppDataProvider({ children }) {

  const [state, setState] = useState({
    programs: [],
    courses: [],
    error: false
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/programs'),
      axios.get('/api/courses'),
    ]).then((all) => {
      setState({
        ...state,
        programs: all[0].data,
        courses: all[1].data
      })
    })
    .catch(error => {
      setState({
        ...state,
        error: true
      })
    })
  }, []);

  return (
    <AppDataContext.Provider value={{ state }}>
      {children}
    </AppDataContext.Provider>
  )

}
