// React
import React from 'react';

// Components and Interfaces
import { YearSelect } from './YearSelect';
import { SubjectSelect } from './SubjectSelect';
import { CourseSelect } from './CourseSelect';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { useTutorCourses } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Theme, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  courseSelectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0rem 1rem',
    width: '320px',
    // height: '300px',
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

  subjectContainer: {
    display: 'flex',
    justifyContent: props => props.subjects.length === 1 ? 'center' : 'space-between'
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    justifyContent: 'center',
    animation: '$fadeInSlide 0.4s ease-in-out',
  },

  coursesRootContainer: {
    display: 'flex',
  },

  coursesSubjectTitle: {
    display: 'inline-block',
    marginTop: '1rem',
    // width: '30%',
    borderBottom: '2px solid #FF5A5F'
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
export interface Course {
  id: number;
  name: string;
  subject: string;
  year: number;
  description: string;
}

// interface Courses {
//   items: {
//     [subject: string]: Course[]
//   }
// }

export default function BecomeTutor() {

  const {
    state,
    setYear,
    setSubject,
    addOrRemoveTutorCourse,
    loading,
    error
  } = useTutorCourses();

  // Style
  const classes = useStyles({subjects: state.subjects});

  // Context variables
  const { currentUser } = useAuth();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.headerContainer}>
        <Typography className={`${classes.text} ${classes.thankYouHeaderText}`}>
          Thank you for your interest in becoming a Tutor, {currentUser.firstName}!
        </Typography>
        <Typography className={classes.text}>
          It’s our amazing tutors that make this platform so valuable to students, so we really appreciate it.
        </Typography>
      </Grid>
      {error && <Typography>Whoops! There appears to have been an error.</Typography>}
      <Paper className={classes.courseSelectorContainer}>
        {!loading ? (
          <Grid container className={classes.formContainer}>
            <Typography className={`${classes.text} ${classes.courseSelectorHeaderText}`}>What courses would you like to assist with?</Typography>
            <Typography className={classes.text}>Select a year to view available courses</Typography>
            <YearSelect 
              years={Object.keys(state.allCourses)} 
              selectedYear={state.year} 
              setYear={setYear}
            />
            <SubjectSelect
              subjects={state.subjects}
              selectedSubject={state.subject}
              setSubject={setSubject}
            />
            <Grid container justify="center" className={classes.coursesRootContainer}>
              <Typography className={`${classes.text} ${classes.coursesSubjectTitle}`}>{state.subject} Courses</Typography>
              <CourseSelect 
                courses={state.selectedCoursesInSubject}
                selectedTutorCourses={state.selectedTutorCourses}
                addOrRemoveTutorCourse={addOrRemoveTutorCourse} 
              />
            </Grid>
          </Grid>
        ) : <CircularProgress className={classes.loadingSpinner} size={100}/>}   
      </Paper>
    </Grid>
  )
}


