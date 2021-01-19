import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../../hooks/useAuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { Course } from '../../../hooks/useApplicationData';
import Grid from '@material-ui/core/Grid';
import CourseItem from './CourseItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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

interface Props {
  courses: Course[];
  error: boolean
}

export default function Home(props: Props) {

  const { currentUser } = useAuth();

  useEffect(() => {
    currentUser.user.getIdToken().then((token: any) => {
      // console.log(token);
    })
    
  }, [])


  const classes = useStyles();
  // console.log(currentUser);

  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.courseTitle}`}>Chat Rooms</Typography>
      <Grid container justify="center" className={classes.container}>
        {props.courses.map((course: Course) => {
          return <CourseItem key={course.id} course={course}/>
        })}
      </Grid>
      <Link to='/chat'>
        <Button variant="outlined">Chat</Button>
      </Link>
    </div>
  );
}

