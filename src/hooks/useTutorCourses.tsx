// React
import { useState, useEffect, useCallback, useReducer } from 'react';

// Other libraries
import axios, { AxiosResponse, AxiosError } from 'axios';

// Interfaces
export interface Course {
  id: number;
  name: string;
  subject: string;
  year: number;
  description: string;
}

export const useTutorCourses = () => {

  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Retrieving all course data from the API
  useEffect(() => {
    axios.get('/api/courses/tutorcourses').then((res: AxiosResponse) => {
      dispatch({ type: 'SET_COURSE_DATA', courses: res.data });
      dispatch({ type: 'SET_YEAR', year: 'first_year', subjects: Object.keys(res.data['first_year']) });
      dispatch({ type: 'SET_SUBJECT', subject: Object.keys(res.data['first_year'])[0] });
      dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject: Object.keys(res.data['first_year'])[0] });
    
      // setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
    .catch((error:AxiosError) => setError(true));
  }, []);

  
  // Reducer logic
  interface State {
    year: string;
    allCourses: any;
    selectedCoursesInYear: any;
    selectedCoursesInSubject: any[];
    subject: string;
    subjects: string[];
    selectedTutorCourses: Course[];
  }

  type Action = 
    | { type: 'SET_YEAR'; year: string, subjects: string[]}
    | { type: 'SET_SUBJECT'; subject: string}
    | { type: 'SET_COURSE_DATA'; courses: any}
    | { type: 'SET_COURSES_IN_SUBJECT'; subject: string}
    | { type: 'ADD_TUTOR_COURSE'; course: Course}
    | { type: 'REMOVE_TUTOR_COURSE'; course: Course}

  const reducer = (state: State, action: Action): State => {

    switch(action.type) {
      case 'SET_YEAR':
      return {
        ...state,
        year: action.year,
        selectedCoursesInYear: state.allCourses[action.year],
        subjects: action.subjects
      }
      case 'SET_SUBJECT':
      return {
        ...state,
        subject: action.subject
      }
      case 'SET_COURSES_IN_SUBJECT':
        return {
          ...state,
          selectedCoursesInSubject: state.selectedCoursesInYear[action.subject]
        }
      case 'SET_COURSE_DATA':
      return {
        ...state,
        allCourses: action.courses,
        selectedCoursesInYear: action.courses['first_year']
      }
      case 'ADD_TUTOR_COURSE':
      return {
        ...state
      }
      case 'REMOVE_TUTOR_COURSE':
      return {
        ...state
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    year: '',
    allCourses: [],
    selectedCoursesInYear: [],
    selectedCoursesInSubject: [],
    subject: '',
    subjects: [],
    selectedTutorCourses: []
  });

  const setYear = useCallback((year: string): void => {
    dispatch({ type: 'SET_YEAR', year, subjects: Object.keys(state.allCourses[year]) })
    dispatch({ type: 'SET_SUBJECT', subject: Object.keys(state.allCourses[year])[0] });
    dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject: Object.keys(state.allCourses[year])[0] });
  }, [state.allCourses]);

  const setSubject = useCallback((subject: string): void => {
    dispatch({ type: 'SET_SUBJECT', subject });
    dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject });
  }, []);

  const addOrRemoveSelectedTutorCourse = useCallback((course: Course, add: boolean): void => {

  }, []);

  return {
    state,
    setYear,
    setSubject,
    addOrRemoveSelectedTutorCourse,
    loading,
    error
  };
}
