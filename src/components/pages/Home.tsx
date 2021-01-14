import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuthContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function Home() {

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
    </div>
  );
}

