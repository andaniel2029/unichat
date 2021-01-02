import { useState } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UserCredentials from './UserCredentials';
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

  title: {
    fontFamily: 'halcom',
    fontSize: '20pt',
    fontWeight: 500,
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


export interface UserCredentialsProps {
  submit: (e: any, email: string) => void,
  setProgress: (value: number) => void
}

interface User {
  email: string | null
  password: string | null,
  program: string | null
}


export default function SignUp() {

  const classes = useStyles();
  const [progress, setProgress] = useState(0);


  const submitCredentials = function(e: any, email: string):void {
    e.preventDefault();
    console.log(email);
    setProgress(50);
    newUser.email = email;
    console.log(newUser);
  }

  const credentialsFunctions:UserCredentialsProps = {
    submit: submitCredentials,
    setProgress: setProgress
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
        <UserCredentials {...credentialsFunctions}/>
      </Paper>
    </div>
  );
}

