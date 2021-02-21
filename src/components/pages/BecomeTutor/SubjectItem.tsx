// React
import React from 'react';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(4),
    // width: theme.spacing(8),
    margin: theme.spacing(2),
    background: props => props.selected ? '#FF5A5F' : '#F7F7F7',
    color: props => props.selected ? 'white' : '#454545',
    boxShadow: 'none',
    transition: '0.2s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
      background: '#FF5A5F'
    }
  },

  text: {
    fontFamily: 'halcom'
  }

}));

interface StyleProps {
  selected: boolean;
}

interface Props {
  subject: string;
  selected: boolean;
  setSubject: (subject: string) => void;
}

export const SubjectItem: React.FC<Props> = ({ subject, selected, setSubject }) => {

  const classes = useStyles({ selected });

  return (
    <Grid item xs={5} sm={3}>
      <Paper className={classes.root} onClick={() => setSubject(subject)}>
        <Typography className={classes.text}>{subject}</Typography>
      </Paper>
    </Grid>
  )
}
