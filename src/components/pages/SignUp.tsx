import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'

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
    boxShadow: "1px 3px 5px 2px #F4F4F4",
    padding: '1rem 4rem 1rem 4rem',
    width: '40%',
  },

  title: {
    marginBottom: '1rem',
    fontFamily: 'halcom',
    fontSize: '20pt',
    color: '#FF5A5F'
  },

  field: {
    width: '40%',
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
  }
}));

export default function SignUp() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Create an Account</Typography>
        <input
            className={classes.field}
            required
            type="text"
            placeholder="Email"
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
      </Paper>
    </div>
  );
}

