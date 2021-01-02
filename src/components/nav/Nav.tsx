import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppButton from '../AppButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    height: '60px',
  },

  logo: {
    fontFamily: 'halcom',
    fontSize: '28pt',
    color: '#FF5A5F'
  }

}));

export interface BtnInput {
  text: string,
  url: string
}

export default function Nav() {


  const join:BtnInput = {
    text: 'Join',
    url: '/signup'
  }

  const classes = useStyles();
  const [user, setUser] = useState(false);
  return (
    <div className={classes.root}>
      <Typography className={classes.logo}>UniChat</Typography>
      <AppButton {...join}/>
    </div>
  )
}
