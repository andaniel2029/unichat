import { useState } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import UserCredentials from './UserCredentials';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    padding: '1rem 4rem 1rem 4rem',
    width: '30%',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '270px',
    width: '100%',
  },

  formInner: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'halcom',
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F'
  },

  field: {
    height: '20px',
    width: '70%',
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
    }
  },

  btn: {
    margin: '0.5rem 0rem 1rem 0rem',
    fontFamily: 'halcom',
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
      background: '#FF5A5F',
    },
  },

  error: {
    color: '#FF5A5F'
  },
}));

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '70%',
      height: 5,
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


interface User {
  email: string | null
  password: string | null,
  program: string | null
}


export default function SignUp() {

  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [haveCredentials, setHaveCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');


  const submitCredentials = function(e: any, email: string, password: string, passwordConfirm: string):void {
    e.preventDefault();

    if(password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    console.log(email, password);
    newUser.email = email;
    setProgress(50);
    setHaveCredentials(true);
    console.log(newUser);
  }

  const newUser:User = {
    email: null,
    password: null,
    program: null
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Create an Account</Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
        {!haveCredentials && 
          (<form className={classes.form} onSubmit={event => submitCredentials(event, email, password, passwordConfirm)}>
            <div className={classes.formInner}>
              <input
                  className={classes.field}
                  required
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              <input
                  className={classes.field}
                  required
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              <input
                  className={classes.field}
                  required
                  type="password"
                  placeholder="confirm password"
                  value={passwordConfirm}
                  onChange={event => setPasswordConfirm(event.target.value)}
                />
                {error && <Typography className={classes.error}>{error}</Typography>}
            </div>
            <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
          </form>
        )}
        {haveCredentials && (
          <div className={classes.form}>
            <Typography>What program are you in?</Typography>
            <Button variant="contained" type="submit" className={classes.btn}>Join</Button>
          </div>
        )}
        <Typography style={{fontFamily: 'halcom'}}>Already have an account?</Typography>
      </Paper>
    </div>
  );
}

