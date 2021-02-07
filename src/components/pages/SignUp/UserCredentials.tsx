// React
import { useState } from 'react';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '400px',
  },

  formInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  nextButton: {
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

  credentialsError: {
    fontFamily: 'halcom',
    textAlign: 'center',
    color: '#FF5A5F'
  }
}));

// Interfaces
interface Props {
  submitCredentials: any,
  error: string
}

export default function UserCredentials (props: Props) {

  // Styles
  const classes = useStyles();

  // State
  const [newUserCredentials, setNewUserCredentials] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  });

  return (
    <form className={classes.root} onSubmit={event => props.submitCredentials(event, newUserCredentials)}>
      <div className={classes.formInnerContainer}>
        <input
            className={classes.textField}
            required
            type="text"
            placeholder="first name"
            value={newUserCredentials.firstName}
            onChange={event => {
              setNewUserCredentials({
                ...newUserCredentials,
                firstName: event.target.value
              })
            }}
          />
        <input
            className={classes.textField}
            required
            type="text"
            placeholder="last name"
            value={newUserCredentials.lastName}
            onChange={event => {
              setNewUserCredentials({
                ...newUserCredentials,
                lastName: event.target.value
              })
            }}
          />
        <input
            className={classes.textField}
            required
            type="text"
            placeholder="email"
            value={newUserCredentials.email}
            onChange={event => {
              setNewUserCredentials({
                ...newUserCredentials,
                email: event.target.value
              })
            }}
          />
        <input
            className={classes.textField}
            required
            type="password"
            placeholder="password"
            value={newUserCredentials.password}
            onChange={event => {
              setNewUserCredentials({
                ...newUserCredentials,
                password: event.target.value
              })
            }}
          />
        <input
            className={classes.textField}
            required
            type="password"
            placeholder="confirm password"
            value={newUserCredentials.passwordConfirm}
            onChange={event => {
              setNewUserCredentials({
                ...newUserCredentials,
                passwordConfirm: event.target.value
              })
            }}
          />
          {props.error && <Typography className={classes.credentialsError}>{props.error}</Typography>}
      </div>
      <Button variant="contained" type="submit" className={classes.nextButton}>Next</Button>
    </form>
  );
}

