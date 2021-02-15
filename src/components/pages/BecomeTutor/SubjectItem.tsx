// React
import React from 'react';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(4),
    width: theme.spacing(8),
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
}

export default function SubjectItem(props: Props) {

  const classes = useStyles(props);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.text}>{props.subject}</Typography>
    </Paper>
  )
}
