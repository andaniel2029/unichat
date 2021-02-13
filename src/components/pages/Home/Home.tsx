// React
import { useState, useEffect } from 'react';

// Components and Interfaces
import CourseItem from './CourseItem';
import TutorItem from './TutorItem';
import { CourseRoom } from '../../../hooks/useApplicationData';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  },

  loadingSpinner: {
    // marginTop: '4rem',
    // fontSize: '60pt',
    color: '#FF5A5F'
  },

}));

// Temporary mock tutor data just used for initial rendering and styling
const tutors:Tutor[] = [
  {
    name: 'Shadee Merhi',
    courses: ['ENGG 233', 'ENGG 201', 'MATH 211']
  },
  {
    name: 'Joshua Arpon',
    courses: ['ENGG 233', 'ENGG 201', 'MATH 211']
  },
  {
    name: 'Sarah Douglas',
    courses: ['ENGG 233', 'ENGG 201', 'MATH 211']
  },
];


// Temporary interface to match above mock data
export interface Tutor {
  name: string;
  courses: string[];
}

export default function Home() {

  // Styles
  const classes = useStyles();

  // Context variables
  const { currentUser } = useAuth();
  const { rooms } = useAppData();

  // State
  const [availableTutors, setAvailableTutors] = useState<Tutor[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  // Testing token authentication with Firebase - to be implemented
  useEffect(() => {
    currentUser.user.getIdToken().then((token: any) => {
      // console.log(token);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAvailableTutors(tutors);
      setLoadingTutors(false);
    }, 2000)
  }, []);


  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.tutorRoomsContainer}>
        <Typography className={`${classes.text} ${classes.sectionTitle}`}>Available Tutors</Typography>
        {loadingTutors && <CircularProgress className={classes.loadingSpinner}/>}
        {availableTutors.length === 0 && !loadingTutors && (
          <div className={classes.noTutorsContainer}>
            <Typography className={`${classes.text} ${classes.noTutorsText}`}>There are no available tutors right now!</Typography>
            <SentimentDissatisfiedIcon className={classes.noTutorsIcon}/>
          </div>
        )}
        {!loadingTutors && <Grid container justify="center">
          {availableTutors.map((tutor: Tutor) => {
            return <TutorItem tutor={tutor}/>
          })}
        </Grid>}
      </Grid>
      <Grid container justify="center" className={classes.chatRoomContainer}>
        <Typography className={`${classes.text} ${classes.sectionTitle}`}>Chat Rooms</Typography>
        <Grid container justify="center">
          {rooms.map((room:CourseRoom) => {
            return <CourseItem key={room.id} room={room} home={true}/>
          })}
        </Grid>
      </Grid>

    </div>
  );
}

