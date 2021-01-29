import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';
import { makeStyles } from '@material-ui/core/styles';
// import { Course } from '../../../hooks/useApplicationData';
import Grid from '@material-ui/core/Grid';
import CourseItem from './CourseItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  container: {
    width: '80%',
  },

  text: {
  },

  courseTitle: {
    fontSize: '20pt',
    fontFamily: 'montserrat',
    borderBottom: '2px solid #FF5A5F'
  }
}));


export default function Home() {

  const classes = useStyles();
  const { currentUser } = useAuth();
  const { courses } = useAppData();
  const [room, setRoom] = useState('');

  useEffect(() => {
    currentUser.user.getIdToken().then((token: any) => {
      // console.log(token);
    })
    
  }, [])


  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.courseTitle}`}>Chat Rooms</Typography>
      <Grid container justify="center" className={classes.container}>
        {courses.map((course:any) => {
          return <CourseItem key={course.id} course={course} setRoom={setRoom} home={true}/>
        })}
      </Grid>
    </div>
  );
}

