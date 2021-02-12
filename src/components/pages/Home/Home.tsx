// React
import { useEffect } from 'react';

// Components and Interfaces
import CourseItem from './CourseItem';
import { CourseRoom } from '../../../hooks/useApplicationData';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  chatRoomContainer: {
    width: '80%'
  },

  courseTitle: {
    fontFamily: 'halcom',
    fontSize: '26pt',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #FF5A5F',
  }
}));

export default function Home() {

  // Styles
  const classes = useStyles();

  // Context variables
  const { currentUser } = useAuth();
  const { rooms } = useAppData();

  // Testing token authentication with Firebase - to be implemented
  useEffect(() => {
    currentUser.user.getIdToken().then((token: any) => {
      // console.log(token);
    });
  }, []);


  return (
    <div className={classes.root}>
      <Typography className={`${classes.courseTitle}`}>Chat Rooms</Typography>
      <Grid container justify="center" className={classes.chatRoomContainer}>
        {rooms.map((room:CourseRoom) => {
          return <CourseItem key={room.id} room={room} home={true}/>
        })}
      </Grid>
    </div>
  );
}

