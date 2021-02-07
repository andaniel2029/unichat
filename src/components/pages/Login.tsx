// React
import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Contexts and Hooks
import { useAuth } from '../../hooks/useAuthContext';

// Material UI
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    padding: '1rem 0rem 1rem',
    width: '320px',
    height: '300px',
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    }
  },

  textField: {
    height: '20px',
    margin: '0.5rem 0rem 0.5rem 0rem',
    fontFamily: 'halcom',
    fontSize: '12pt',
    border: '1px solid #E8E8E8',
    padding: '10px',
    borderRadius: '10px',
    transition: '0.2s ease-in-out',
    '&:focus': {
      outline: 'none',
      border: '1px solid #FF5A5F',
      borderRadius: '10px',

    },
    '&::placeholder': {
      fontSize: '12pt',
      fontFamily: 'halcom',
      color: '#838383'
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px'
    }
  },

  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '250px',
  },

  formInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  programTitle: {
    fontFamily: 'halcom',
    [theme.breakpoints.up('sm')]: {
      fontSize: '13pt'
    }
  },

  text: {
    fontFamily: 'halcom'
  },

  loginTitle: {
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F',
  },

  loginButton: {
    margin: '0.5rem 0rem 1rem 0rem',
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
      background: '#FF5A5F',
    },
  },

  signupLink: {
    color: '#FF5A5F',
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
  },

  loginError: {
    fontFamily: 'halcom',
    textAlign: 'center',
    color: '#FF5A5F'
  },

  spinner: {
    marginTop: '4rem',
    fontSize: '4rem',
    color: '#FF5A5F'
  },

  redirectContainer: {
    marginTop: '1rem',
  }
}));

// Progress bar at top of component to show successful login
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '70%',
      minHeight: 5,
      borderRadius: 5,
      marginBottom: '1rem',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#FF5A5F',
    },
  }),
)(LinearProgress);


export default function Login() {

  // Styles
  const classes = useStyles();

  // Context variables and hooks
  const { login } = useAuth();
  const history = useHistory();

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Responsible for validating user credentials
  const handleLogin = function(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    login(email, password)
    .then(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        history.push('/');
      }, 1000);
    })
    .catch((error: Error) => {
      setLoading(false);
      return setError('email or password is incorrect');
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.loginContainer}>
        <Typography className={`${classes.text} ${classes.loginTitle}`}>Login</Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
        {loading && <CircularProgress className={classes.spinner} size={100}/>}
        {!loading && <form className={classes.formRoot} onSubmit={event => handleLogin(event)}>
          <div className={classes.formInnerContainer}>
            <input
                className={classes.textField}
                required
                type="email"
                placeholder="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            <input
                className={classes.textField}
                required
                type="password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {error && 
                <Typography className={`${classes.text} ${classes.loginError}`}>{error}</Typography>
              }
          </div>
          <Button 
            variant="contained" 
            type="submit" 
            className={`${classes.text} ${classes.loginButton}`}>
            Login
          </Button>
        </form>}
      </Paper>
      <div className={classes.redirectContainer}>
        <Typography className={classes.text}>
          Don't have an account? <Link to="/signup" className={classes.signupLink}>Sign Up</Link>
        </Typography>
      </div>
    </div>
  );
}

