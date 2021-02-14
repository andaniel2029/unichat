// React
import React, { useState, useEffect } from 'react';

// Components and Interfaces
import YearItem from './YearItem';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
// import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Theme, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

// Other libraries
import axios, { AxiosError, AxiosResponse } from 'axios';

const useStyles = makeStyles((theme: Theme) => ({

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
    margin: '0.5rem 0rem 0.5rem 0rem'
  },

  thankYouHeaderText: {
    fontSize: '20pt',
    borderBottom: '2px solid #FF5A5F',
    color: '#454545',
    marginBottom: '1.5rem'
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

export default function BecomeTutor() {

  // Style
  const classes = useStyles();

  // Context variables
  const { currentUser } = useAuth();
  // const { tutorCourses } = useAppData();

  // State
  const [loading, setLoading] = useState(true);
  const [tutorCourses, setTutorCourses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('First Year');
  const [error, setError] = useState(false);

  // Retrieving all course data from the API
  useEffect(() => {
    axios.get('/api/courses/tutorcourses').then((res: AxiosResponse) => {
      setTutorCourses(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    })
    .catch((error:AxiosError) => setError(true));
  }, []);
  
  console.log(tutorCourses);
  
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
      {error && <Typography>There was an error</Typography>}
      <Paper className={classes.courseSelectorContainer}>
        {!loading ? (
          <>
            <Typography className={`${classes.text} ${classes.courseSelectorHeaderText}`}>What courses would you like to assist with?</Typography>
            <Typography className={classes.text}>Select a year to view available courses</Typography>
            <div className={classes.toggleYearContainer}>
              {['First Year', 'Second Year', 'Third Year'].map(year => {
                return <YearItem year={year} setSelectedYear={setSelectedYear} selected={year === selectedYear}/>
              })}
            </div>
          </>
        ) : <CircularProgress className={classes.loadingSpinner} size={100}/>}   
      </Paper>
    </div>
  )
}


