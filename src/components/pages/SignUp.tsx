import { useState } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
    boxShadow: "1px 4px 5px 2px #EDEDED",
    padding: '1rem 4rem 1rem 4rem',
    width: '30%',
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
    width: '130%',
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
    width: '200px',
    alignItems: 'center'
  },

  btn: {
    marginTop: '1rem',
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
}));

export default function SignUp() {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const formSubmit = function(e: any, email: string) {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Create an Account</Typography>
        <form className={classes.form} onSubmit={event => formSubmit(event, email)}>
          <input
              className={classes.field}
              required
              type="text"
              placeholder="Email"
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
            <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
        </form>
      </Paper>
    </div>
  );
}

