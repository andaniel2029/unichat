// React
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components and Interfaces
import UserCredentials from './UserCredentials';
import SelectProgram from './SelectProgram';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  text: {
    fontFamily: 'halcom'
  },

  signupContainer: {
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

  signupTitle: {
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F',
  },

  loginLink: {
    color: '#FF5A5F',
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
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

// Progress bar at the top of the SignUp form
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

// Interfaces
interface newUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {

  // Styles
  const classes = useStyles();

  // Context variables
  const { firebaseSignUp, submitApplicationUser } = useAuth();
  const { programs } = useAppData();

  // State
  const [firstName, setFirstName] = useState('');
  const [progress, setProgress] = useState(0);
  const [haveCredentials, setHaveCredentials] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Responsible for handling credentials input by the user
  // firebaseSignUp communicates with the Firebase database to create the new user 
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

    // Creating new Firebase user
    firebaseSignUp(newUser.firstName, newUser.lastName, newUser.email, newUser.password)
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

  // Creating user in application database (i.e. Postgres)
  // *Note* Firebase and Postgres user creation will be combined together into single step
  const createApplicationUser = function(selected: string) {

    if(!selected) return setError('Please select a program');

    setLoading(true);
    setError('');
    
    // submitUser creates application user (i.e. Postgres)
    submitApplicationUser(selected)
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
      }, 500);
    })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.signupContainer}>
        <Typography className={`${classes.text} ${classes.signupTitle}`}>Create an Account</Typography>
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
            programs={programs}
            firstName={firstName}
            createApplicationUser={createApplicationUser}
            error={error}
            loading={loading}
          />
          )}
      </Paper>
      <div className={classes.redirectContainer}>
        <Typography className={classes.text}>
          Already have an account? <Link to="/login" className={classes.loginLink}>Login</Link>
        </Typography>
      </div>
    </div>
  );
}

