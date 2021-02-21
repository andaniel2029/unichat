// React
import React from 'react';

// Components and Interfaces
import { TutorForm } from './TutorForm';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { TutorCourseProvider } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '160px',
    width: '100%',
    animation: '$fadeInSlide 0.4s ease-in-out',
    background: '#F7F7F7',
    marginBottom: '2rem',
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

  return (
    <TutorCourseProvider>
      <Grid container justify="center">
        <Grid item className={classes.headerContainer}>
          <Typography className={`${classes.text} ${classes.thankYouHeaderText}`}>
            Thank you for your interest in becoming a Tutor, {currentUser.firstName}!
          </Typography>
          <Typography className={classes.text}>
            It’s our amazing tutors that make this platform so valuable to students, so we really appreciate it.
          </Typography>
        </Grid>
        <TutorForm />
      </Grid>
    </TutorCourseProvider>
  )
}


