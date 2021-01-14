import { useState } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';



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

interface Props {
  submitCredentials: any,
  error: string
}

export default function UserCredentials(props: Props) {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <form className={classes.form} onSubmit={event => props.submitCredentials(event)}>
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
          {props.error && <Typography className={classes.error}>{props.error}</Typography>}
      </div>
      <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
    </form>
  );
}

