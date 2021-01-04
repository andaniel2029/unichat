/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Programs from './Programs';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SignUpProps } from '../../../App';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Program } from '../../../hooks/useApplicationData';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuthContext';


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
    padding: '1rem 0rem 1rem',
    width: '320px',
    height: '450px',
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    }
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '400px',
  },

  formInner: {
    display: 'flex',
    // width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  programTitle: {
    fontFamily: 'halcom',
    [theme.breakpoints.up('sm')]: {
      fontSize: '13pt'
    }
  },

  title: {
    fontFamily: 'halcom',
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F',
  },

  field: {
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
    fontFamily: 'halcom',
    textAlign: 'center',
    color: '#FF5A5F'
  },

  spinner: {
    marginTop: '4rem',
    fontSize: '4rem',
    color: '#FF5A5F'
  }
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

export interface ProgramsProps {
  programs: Program[],
  setSelected: (selected: string) => void,
  selected: string
}


export default function SignUp(props: SignUpProps) {

  const classes = useStyles();

  const { signup, submitUser, getUserByEmail, currentUser } = useAuth();
  const [progress, setProgress] = useState(0);
  const [haveCredentials, setHaveCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [selected, setSelected] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitCredentials = async function(e: any) {
    e.preventDefault();

    if(password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    if(password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    // const exists = await getUserByEmail(email);
    // console.log('do they exist', exists);

    // if(exists) {
    //   setLoading(false);
    //   return setError('Email already in use with another account');
    // }

    // setLoading(false);
    // setProgress(50);
    // setHaveCredentials(true);
    // setError('');

    console.log('lololol');

    signup(firstName, lastName, email, password, selected)
    .then(() => {
      console.log('after user sign up');
      setLoading(false);
      setHaveCredentials(true);
      setError('');
      setProgress(50);
    })
    .catch((error: any) => {
      console.log(error.message);
      setLoading(false);
      return setError(error.message);
    });
  }

  // Hitting our own backend and database
  const createUser = function() {
    setLoading(true);

    // Need to wait until we get back from own backend before history.push('/')
    newUser.program = selected;
    newUser.email = email;
    console.log('the new user', newUser);

    console.log('checking', password);


    signup(firstName, lastName, email, password, selected)
    .then((data: any) => {
      setTimeout(() => {
        setLoading(false);
        history.push('/');
      }, 500)
    })
    .catch((error: any) => {
      console.log(error);
      setTimeout(() => {
        setLoading(false);
        setError('Whoops! Something went wrong on our end. Please try again')
      }, 500)
    })

    // submitUser(selected)
    // .then((data: any) => {
    //   console.log('back in signup', data);
    //   setTimeout(() => {
    //     setLoading(false);
    //     history.push('/');
    //   }, 500)
    // })
    // .catch((error: any) => {
    //   console.log(error);
    //   setTimeout(() => {
    //     setLoading(false);
    //     setError('Whoops! Something went wrong on our end. Please try again')
    //   }, 500)
    // })

  }

  const newUser:User = {
    email: null,
    password: null,
    program: null
  }

  const propsPrograms:ProgramsProps = {
    programs: props.programs,
    setSelected: setSelected,
    selected: selected
  }

  console.log(currentUser);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Create an Account</Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
        {!haveCredentials && !loading && 
          (<form className={classes.form} onSubmit={event => submitCredentials(event)}>
            <div className={classes.formInner}>
              <input
                  className={classes.field}
                  required
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
              <input
                  className={classes.field}
                  required
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
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
                <Typography style={{fontFamily: 'halcom'}}>Already have an account?</Typography>
                {error && <Typography className={classes.error}>{error}</Typography>}
            </div>
            <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
          </form>
        )}
        {loading && <CircularProgress className={classes.spinner} size={200}/>}
        {haveCredentials && (
          <div className={classes.form}>
            {!loading && (
              <Fragment>
                <Typography className={classes.programTitle}>Welcome, {firstName}! What program are you in?</Typography>
                <Programs {...propsPrograms}/>
              </Fragment>
            )}
            {error && <Typography className={classes.error}>{error}</Typography>}
            {!loading && <Button variant="contained" type="submit" className={classes.btn} onClick={() => createUser()}>Join</Button>}
          </div>
        )}
      </Paper>
    </div>
  );
}

