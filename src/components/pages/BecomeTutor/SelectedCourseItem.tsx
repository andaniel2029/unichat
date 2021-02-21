// React
import React from 'react';

// Material UI
import { makeStyles, Theme, Typography, Paper, Grid } from '@material-ui/core';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Course } from '../../../hooks/useTutorCourses';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(4),
    // width: theme.spacing(14),
    padding: '5px',
    margin: theme.spacing(2),
    // background: props => props.selected ? '#FF5A5F' : '#F7F7F7',
    background: '#F7F7F7',
    // color: props => props.selected ? 'white' : '#454545',
    color: '#454545',
    boxShadow: 'none',
    transition: '0.2s ease-in-out',
    '&:hover': {
      // cursor: props => props.selected ? 'auto' : 'pointer',
      // color: 'white',
      // background: '#FF5A5F',
      '& $addIcon': {
      color: '#FF5A5F',
      }
    }
  },

  text: {
    fontFamily: 'halcom'
  },

  icon: {
    transition: '0.2s ease-in-out',
  },
  
  removeIcon: {
    fontSize: '22pt',
    color: '#C7C7C7',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  checkIcon: {
    color: '#FF5A5F',
  }
}));

interface Props {
  course: Course;
  addOrRemoveTutorCourse: (course: Course, add: boolean) => void;
}

export const SelectedCourseItem: React.FC<Props> = ({ course, addOrRemoveTutorCourse }) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} onClick={() => addOrRemoveTutorCourse(course, false)}>
      <Paper className={classes.root}>
        {course.name}
        {course.title}
        <RemoveCircleIcon className={classes.removeIcon}/>
      </Paper>
    </Grid>
  )
}
