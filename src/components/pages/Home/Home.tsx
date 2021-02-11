// React
import { useState, useEffect } from 'react';

// Components
import CourseItem from './CourseItem';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'halcom',
  },

  tutorRoomsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  noTutorsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  noTutorsText: {
    fontSize: '14pt'
  },

  noTutorsIcon: {
    fontSize: '50pt',
    color: '#ACABAB',
    marginTop: '1rem',
  },

  chatRoomContainer: {
    // width: '80%',
    margin: '2rem 0rem 2rem 0rem',
    background: '#FCFCFC'
  },

  sectionTitle: {
    fontFamily: 'halcom',
    fontSize: '26pt',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #FF5A5F',
  }
}));

const tutors = [1, 2, 3, 4];

export default function Home() {

  // Styles
  const classes = useStyles();

  // Context variables
  const { currentUser } = useAuth();
  const { courses } = useAppData();

  // State
  const [availableTutors, setAvailableTutors] = useState([]);

  // Testing token authentication with Firebase - to be implemented
  useEffect(() => {
    currentUser.user.getIdToken().then((token: any) => {
      // console.log(token);
    });
  }, []);


  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.tutorRoomsContainer}>
        <Typography className={`${classes.text} ${classes.sectionTitle}`}>Available Tutors</Typography>
        {availableTutors.length === 0 && (
        <div className={classes.noTutorsContainer}>
          <Typography className={`${classes.text} ${classes.noTutorsText}`}>There are no available tutors right now!</Typography>
          <SentimentDissatisfiedIcon className={classes.noTutorsIcon}/>
        </div>
        )}
      </Grid>
      <Grid container justify="center" className={classes.chatRoomContainer}>
        <Typography className={`${classes.text} ${classes.sectionTitle}`}>Chat Rooms</Typography>
        <Grid container justify="center">
          {courses.map((course:any) => {
            return <CourseItem key={course.id} course={course} home={true}/>
          })}
        </Grid>
      </Grid>

    </div>
  );
}

