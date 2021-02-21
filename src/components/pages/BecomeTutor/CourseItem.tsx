// React
import React from 'react';

// Material UI
import { makeStyles, Theme, Typography, Paper, Grid } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Course } from './Index';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(4),
    // width: theme.spacing(14),
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
  course: Course
  selected: boolean;
}

export const CourseItem: React.FC<Props> = ({ course, selected}) => {

  const classes = useStyles({ selected });

  return (
    <Grid item xs={4}>
      <Paper className={classes.root}>
        <AddCircleIcon />
        <Typography className={classes.text}>{course.name}</Typography>
      </Paper>
    </Grid>
  )
}
