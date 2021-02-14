// React
import React, { useState, useEffect } from 'react';

// Components and Interfaces

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Theme } from '@material-ui/core';

// Other libraries
import axios, { AxiosError, AxiosResponse } from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: '$fadeInSlide 0.4s ease-in-out',
  },

  text: {
    fontFamily: 'halcom'
  },

  thankYouHeaderText: {
    fontSize: '20pt',
    borderBottom: '2px solid #FF5A5F',
    color: '#454545',
    marginBottom: '1.5rem'
  },

  tutorMessageText: {
    fontSize: '13pt',
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

  // State
  const [error, setError] = useState(false);

  // Retrieving all course data from the API
  useEffect(() => {
    axios.get('/api/courses/tutorcourses').then((res: AxiosResponse) => {
      console.log(res.data);
    })
    .catch((error:AxiosError) => setError(true));
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.thankYouHeaderText}`}>
        Thank you for your interest in becoming a Tutor, {currentUser.firstName}!
      </Typography>
      <Typography className={`${classes.text} ${classes.tutorMessageText}`}>
        It’s our amazing tutors that make this platform so valuable to students, so we really appreciate it.
      </Typography>
      {error && <Typography>There was an error</Typography>}
    </div>
  )
}
