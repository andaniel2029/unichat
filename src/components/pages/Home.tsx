import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { Course } from '../../hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({

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

  useEffect(() => {
    currentUser.firstName = localStorage.getItem('firstName');
    currentUser.lastName = localStorage.getItem('lastName');
    currentUser.program = localStorage.getItem('program');
  }, []);

  const classes = useStyles();
  console.log(currentUser);

  return (
    <div>
      <Typography>Home Page</Typography>
      <Typography>Welcome, {currentUser.firstName}!</Typography>
      <Typography>{currentUser.program}</Typography>
      {props.courses.map(course => {
        return <p>{course.name}</p>
      })}
    </div>
  );
}

