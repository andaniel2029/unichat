// React
import React, { useEffect, useState, useContext } from 'react';

// Other libraries
import axios from 'axios';

const AppDataContext = React.createContext();

export function useAppData() {
  return useContext(AppDataContext);
}

export function AppDataProvider({ children }) {

  // State - will likely implement useReducer here when tutor functionality is implemented
  const [state, setState] = useState({
    programs: [],
    courses: [],
    error: false
  });

  // Consuming our api to retrieve application-level data
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

  const value = {
    programs: state.programs,
    courses: state.courses
  }

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  )
}
