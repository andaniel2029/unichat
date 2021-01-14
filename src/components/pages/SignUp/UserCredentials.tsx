import { useState, useMemo } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) => ({

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '400px',
  },

  formInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  }
}));

interface Props {
  submitCredentials: any,
  error: string
}

export default function UserCredentials (props: Props) {

  const classes = useStyles();
  console.log('rerender');
  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  });

  // console.log('firstname in new thing', newUser);

  return (
    <form className={classes.form} onSubmit={event => props.submitCredentials(event, newUser)}>
      <div className={classes.formInner}>
        <input
            className={classes.field}
            required
            type="text"
            placeholder="first name"
            value={newUser.firstName}
            onChange={event => {
              setNewUser({
                ...newUser,
                firstName: event.target.value
              })
            }}
          />
        <input
            className={classes.field}
            required
            type="text"
            placeholder="last name"
            value={newUser.lastName}
            onChange={event => {
              setNewUser({
                ...newUser,
                lastName: event.target.value
              })
            }}
          />
        <input
            className={classes.field}
            required
            type="text"
            placeholder="email"
            value={newUser.email}
            onChange={event => {
              setNewUser({
                ...newUser,
                email: event.target.value
              })
            }}
          />
        <input
            className={classes.field}
            required
            type="password"
            placeholder="password"
            value={newUser.password}
            onChange={event => {
              setNewUser({
                ...newUser,
                password: event.target.value
              })
            }}
          />
        <input
            className={classes.field}
            required
            type="password"
            placeholder="confirm password"
            value={newUser.passwordConfirm}
            onChange={event => {
              setNewUser({
                ...newUser,
                passwordConfirm: event.target.value
              })
            }}
          />
          {props.error && <Typography className={classes.error}>{props.error}</Typography>}
      </div>
      <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
    </form>
  );
}

