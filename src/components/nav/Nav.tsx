import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../hooks/useAuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    height: '60px',
  },

  logo: {
    fontFamily: 'halcom',
    fontSize: '28pt',
    color: '#FF5A5F'
  },

  button: {
    fontFamily: 'halcom',
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
    },
  },

  link: {
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
  }

}));

export default function Nav() {

  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  console.log('nav user', currentUser);
  const history = useHistory();

  const handleLogout = function() {
    setError('');
    logout()
    .then(() => {
      history.push('/login');
    })
    .catch((error: any) => {
      setError('Unable to logout')
    })
  }


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.logo}>UniChat</Typography>
      {<Link to="/signup" className={classes.link}>
        <Button variant="contained" className={classes.button}>Join</Button>
      </Link>}
      <Button variant="contained" className={classes.button} onClick={handleLogout}>Logout</Button>
    </div>
  )
}
