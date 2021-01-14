/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Programs from './Programs';
import { SignUpProps } from '../../../App';
import { Program } from '../../../hooks/useApplicationData';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({

  form: {
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
}));


interface Props {
  programs: Program[];
  firstName: string;
  createUser: any;
  error: string;
  loading: boolean;
}


export default function SelectProgram(props: Props) {

  const classes = useStyles();
  const [selected, setSelected] = useState('');

  return (
    <div className={classes.form}>
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
      {props.error && <Typography className={classes.error}>{props.error}</Typography>}
      {!props.loading && <Button variant="contained" type="submit" className={classes.btn} onClick={() => props.createUser(selected)}>Join</Button>}
    </div>
  );
}

