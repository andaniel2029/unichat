// React
import { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Contexts and Hooks
import { useAuth } from '../../hooks/useAuthContext';
import { useSocket } from '../../contexts/SocketProvider';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
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

  // Styles
  const classes = useStyles();

  // Context variables
  const { currentUser, logout } = useAuth();
  const { socket } = useSocket();
  const history = useHistory();

  // State
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState(0);

  // Test useEffect to listen for socket events from children - will be used later for notifications
  useEffect(() => {
    if(!socket) return;
    socket.on('hey', ({ message }: any) => {
      console.log('notification received');
      setNotifications(prev => prev + 1);
    });
    return () => socket.off('sendNotification');
  }, [socket]);
  

  // Communicates with Firebase logout function
  const handleLogout = function() {
    setError('');
    logout()
    .then(() => {
      history.push('/login');
    })
    .catch((error: any) => {
      setError('Unable to logout');
    })
  };
  
  
  return (
    <div className={classes.root}>
      <Link to='/' className={classes.link}>
        <Typography className={`${classes.text} ${classes.logo}`}>UniChat</Typography>
      </Link>
      <div className={classes.buttonContainer}>
        {error && <Typography className={classes.text}>{error}</Typography>}
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
