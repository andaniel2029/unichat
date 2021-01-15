import { Fragment, useState } from 'react';
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

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  font: {
    fontFamily: 'halcom',
  },

  name: {
    fontFamily: 'halcom',
    color: '#FF5A5F',
    fontSize: '14pt',
    marginRight: '2rem',
  },

  logo: {
    fontSize: '28pt',
    color: '#FF5A5F'
  },

  button: {
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    margin: '0rem 0.5rem 0rem 0.5rem',
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
      <Typography className={`${classes.font} ${classes.logo}`}>UniChat</Typography>
      <div className={classes.buttonContainer}>
        {!currentUser.user && <Link to="/login" className={classes.link}>
          <Button variant="contained" className={classes.button}>Login</Button>
        </Link>}
        {!currentUser.user && <Link to="/signup" className={classes.link}>
          <Button variant="contained" className={classes.button}>Join</Button>
        </Link>}
        {currentUser.user && 
          <Fragment>
            <Typography className={classes.name}>{currentUser.firstName}</Typography>
            <Button variant="contained" className={classes.button} onClick={handleLogout}>Logout</Button> 
          </Fragment>
        }
      </div>
    </div>
  )
}
