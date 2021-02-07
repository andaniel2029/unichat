// React
import { Fragment, useState } from 'react';

// Components and Interfaces
import Programs from './Programs';

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

  programTitle: {
    fontFamily: 'halcom',
    [theme.breakpoints.up('sm')]: {
      fontSize: '13pt'
    }
  },

  joinButton: {
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

  joinError: {
    fontFamily: 'halcom',
    textAlign: 'center',
    color: '#FF5A5F'
  },
}));

// Interfaces
interface Props {
  programs: any;
  firstName: string;
  createUser: any;
  error: string;
  loading: boolean;
}

export default function SelectProgram(props: Props) {

  const classes = useStyles();
  const [selected, setSelected] = useState('');
  
  return (
    <div className={classes.root}>
      {!props.loading && (
        <Fragment>
          <Typography className={classes.programTitle}>Welcome, {props.firstName}! What program are you in?</Typography>
          <Programs 
            programs={props.programs}
            setSelected={setSelected}
            selected={selected}
          />
        </Fragment>
      )}
      {props.error && <Typography className={classes.joinError}>{props.error}</Typography>}
      {!props.loading && <Button variant="contained" type="submit" className={classes.joinButton} onClick={() => props.createUser(selected)}>Join</Button>}
    </div>
  );
}