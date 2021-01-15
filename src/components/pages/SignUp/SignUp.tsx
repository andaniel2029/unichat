import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import UserCredentials from './UserCredentials';
import SelectProgram from './SelectProgram';
import { SignUpProps } from '../../../App';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuthContext';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

  programTitle: {
    fontFamily: 'halcom',
    [theme.breakpoints.up('sm')]: {
      fontSize: '13pt'
    }
  },

  typography: {
    fontFamily: 'halcom'
  },

  title: {
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F',
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

  link: {
    color: '#FF5A5F',
    textDecoration: 'none',
    '&:visited': {
      // color: 'black',
      textDecoration: 'none',
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
  },

  redirectContainer: {
    marginTop: '1rem',
  }
}));

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


interface newUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;

}

export default function SignUp(props: SignUpProps) {

  const classes = useStyles();

  const { signup, submitUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [progress, setProgress] = useState(0);
  const [haveCredentials, setHaveCredentials] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitCredentials = async function(e: any, newUser: newUser) {
    setFirstName(newUser.firstName);
    e.preventDefault();

    if(newUser.password !== newUser.passwordConfirm) {
      return setError('Passwords do not match');
    }

    if(newUser.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    signup(newUser.firstName, newUser.lastName, newUser.email, newUser.password)
    .then(() => {
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
  const createUser = function(selected: string) {

    if(!selected) return setError('Please select a program');

    setLoading(true);
    setError('');
    
    submitUser(selected)
    .then((data: any) => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        history.push('/');
      }, 1500)
    })
    .catch((error: any) => {
      setTimeout(() => {
        setLoading(false);
        setError('Whoops! Something went wrong on our end. Please try again')
      }, 500)
    })
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={`${classes.typography} ${classes.title}`}>Create an Account</Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
        {!haveCredentials && !loading && 
          (<UserCredentials 
            submitCredentials={submitCredentials}
            error={error}
          />)
        }
        {loading && <CircularProgress className={classes.spinner} size={200}/>}
        {haveCredentials && (
          <SelectProgram 
            programs={props.programs}
            firstName={firstName}
            createUser={createUser}
            error={error}
            loading={loading}
          />
          )}
      </Paper>
      <div className={classes.redirectContainer}>
        <Typography className={classes.typography}>
          Already have an account? <Link to="/login" className={classes.link}>Login</Link>
        </Typography>
      </div>
    </div>
  );
}

