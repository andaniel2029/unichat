import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JoinButton from './JoinButton';
import SignInButton from './SignInButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    height: '60px',
    border: '1px solid red'
  },

  logo: {
    fontFamily: 'halcom',
    fontSize: '28pt',
    color: '#FF5A5F'
  }

}));

export default function Nav() {

  const classes = useStyles();
  const [user, setUser] = useState(false);
  return (
    <div className={classes.root}>
      <Typography className={classes.logo}>UniChat</Typography>
      {!user && <JoinButton />}
      {user && <SignInButton />}
    </div>
    
  )
}
