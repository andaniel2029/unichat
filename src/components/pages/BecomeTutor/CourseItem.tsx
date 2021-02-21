// React
import React from 'react';

// Components and Interfaces
import { Course } from './Index';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(4),
    width: theme.spacing(14),
    padding: '10px',
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
  courseName: string;
  selected: boolean;
}

export const CourseItem: React.FC<Props> = ({ selected, courseName }) => {

  const classes = useStyles({ selected });

  return (
    <Paper className={classes.root}>
      <AddCircleIcon />
      <Typography className={classes.text}>{courseName}</Typography>
    </Paper>
  )
}
