// React
import React, { useState, useEffect, useCallback, useReducer } from 'react';

// Components and Interfaces
import { YearItem } from './YearItem';
import { SubjectItem } from './SubjectItem';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Theme, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Other libraries
import axios, { AxiosError, AxiosResponse } from 'axios';
import { StarRateTwoTone } from '@material-ui/icons';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '160px',
    width: '100%',
    animation: '$fadeInSlide 0.4s ease-in-out',
    background: '#F7F7F7',
    marginBottom: '2rem'
  },

  text: {
    fontFamily: 'halcom',
    fontSize: '13pt',
    margin: '0.5rem 0rem 0.5rem 0rem',
    textAlign: 'center',
  },

  thankYouHeaderText: {
    fontSize: '20pt',
    borderBottom: '2px solid #FF5A5F',
    color: '#454545',
    marginBottom: '1.5rem',
  },

  courseSelectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0rem 1rem',
    width: '320px',
    height: '300px',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    [theme.breakpoints.up('sm')]: {
      width: '650px'
    }
  },

  courseSelectorHeaderText: {
    fontSize: '14pt',
    borderBottom: '2px solid #FF5A5F',
  },

  toggleYearContainer: {
    display: 'flex'
  },

  subjectContainer: {
    display: 'flex',
    justifyContent: props => props.subjects.length === 1 ? 'center' : 'space-between'
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    animation: '$fadeInSlide 0.4s ease-in-out',
  },

  coursesContainer: {

  },

  loadingSpinner: {
    marginTop: '4rem',
    fontSize: '4rem',
    color: '#FF5A5F'
  },

  '@keyframes fadeInSlide': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0px)',
    }
  }
}));

interface StyleProps {
  subjects: string[]
}

// Interfaces - will be implemented soon
// export interface Course {
//   id: number;
//   name: string;
//   subject: string;
//   year: number;
//   description: string;
// }

// interface Courses {
//   items: {
//     [subject: string]: Course[]
//   }
// }

export default function BecomeTutor() {

  // Style

  // Context variables
  const { currentUser } = useAuth();

  interface State {
    year: string;
    allCourses: any;
    selectedCoursesInYear: any;
    selectedCoursesInSubject: any[];
    subject: string;
    subjects: string[];
  }

  type Action = 
    | { type: 'SET_YEAR'; year: string, subjects: string[]}
    | { type: 'SET_SUBJECT'; subject: string}
    | { type: 'SET_COURSE_DATA'; courses: any}
    | { type: 'SET_COURSES_IN_SUBJECT'; subject: string}

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
    }
  }

  // State
  const [state, dispatch] = useReducer(reducer, {
    year: '',
    allCourses: [],
    selectedCoursesInYear: [],
    selectedCoursesInSubject: [],
    subject: '',
    subjects: []
  });

  const classes = useStyles({subjects: state.subjects});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Retrieving all course data from the API
  useEffect(() => {
    axios.get('/api/courses/tutorcourses').then((res: AxiosResponse) => {
      dispatch({ type: 'SET_COURSE_DATA', courses: res.data });
      dispatch({ type: 'SET_YEAR', year: 'first_year', subjects: Object.keys(res.data['first_year']) });
      dispatch({ type: 'SET_SUBJECT', subject: Object.keys(res.data['first_year'])[0] });
      dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject: Object.keys(res.data['first_year'])[0] });
    
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
    })
    .catch((error:AxiosError) => setError(true));
  }, []);

  const setYear = (year: string) => {
    dispatch({ type: 'SET_YEAR', year, subjects: Object.keys(state.allCourses[year]) })
    dispatch({ type: 'SET_SUBJECT', subject: Object.keys(state.allCourses[year])[0] });
    dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject: Object.keys(state.allCourses[year])[0] });
  }

  const setSubject = (subject: string) => {
    console.log('being called', subject);
    dispatch({ type: 'SET_SUBJECT', subject });
    dispatch({ type: 'SET_COURSES_IN_SUBJECT', subject });
  }


  // Currently not being used properly - will be implemented to add additional step for user to
  // in which user will click 'View Courses'; then courseData will be fetched from the API instead
  // of in above useEffect

  const getCourseData = useCallback(() => {
    console.log('calling the function');
    axios.get('/api/courses/testendpoint').then((res: AxiosResponse) => {
      console.log(res.data);
    })
  }, []);

  console.log(state.selectedCoursesInSubject);

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <Typography className={`${classes.text} ${classes.thankYouHeaderText}`}>
          Thank you for your interest in becoming a Tutor, {currentUser.firstName}!
        </Typography>
        <Typography className={classes.text}>
          It’s our amazing tutors that make this platform so valuable to students, so we really appreciate it.
        </Typography>
      </div>
      {error && <Typography>Whoops! There appears to have been an error.</Typography>}
      <Paper className={classes.courseSelectorContainer}>
        {!loading ? (
          <div className={classes.formContainer}>
            <Typography className={`${classes.text} ${classes.courseSelectorHeaderText}`}>What courses would you like to assist with?</Typography>
            <Typography className={classes.text}>Select a year to view available courses</Typography>
            <div className={classes.toggleYearContainer}>
              {Object.keys(state.allCourses).map(year => {
                return (
                  <YearItem
                    key={year}
                    year={year} 
                    selected={year === state.year}
                    setYear={setYear}
                  />
                )
              })}
            </div>
            <div className={classes.subjectContainer}>
              {state.subjects.map(subject => {
                return (
                  <SubjectItem
                    key={subject}
                    subject={subject}
                    selected={subject === state.subject}
                    setSubject={setSubject}
                  />
                )
              })}
            </div>
            <div className={classes.coursesContainer}>
              {state.selectedCoursesInSubject.map((course: any) => {
                return <Typography>{course.name}</Typography>
              })}
            </div>
            {/* <Button variant="contained" onClick={getCourseData}>Call API</Button> */}
          </div>
        ) : <CircularProgress className={classes.loadingSpinner} size={100}/>}   
      </Paper>
    </div>
  )
}


