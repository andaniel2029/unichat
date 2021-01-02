import { useRef } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #ededed",
    padding: '1rem 4rem 1rem 4rem',
    width: '40%',
  },

  title: {
    marginBottom: '1rem',
    fontFamily: 'halcom',
    fontSize: '20pt',
    fontWeight: 500,
    color: '#FF5A5F'
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
    }
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  }
}));

export default function SignUp() {

  const classes = useStyles();
  const emailRef = useRef();
  // const passwordRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Create an Account</Typography>
        <form className={classes.form}>
          <input
              className={classes.field}
              required
              type="text"
              placeholder="Email"
              ref={emailRef.current}
            />
          <input
              className={classes.field}
              required
              type="password"
              placeholder="password"
            />
          <input
              className={classes.field}
              required
              type="password"
              placeholder="confirm password"
            />
        </form>
      </Paper>
    </div>
  );
}

