// React
import React from 'react';

// Material UI
import { makeStyles, Theme, Typography, Paper, Grid } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Course } from '../../../hooks/useTutorCourses';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
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
      cursor: props => props.selected ? 'auto' : 'pointer',
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
    fontSize: '22pt',
  },

  addIcon: {
    color: '#C7C7C7',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  checkIcon: {
    color: '#FF5A5F',
  }
}));

interface StyleProps {
  selected: boolean;
}

interface Props {
  course: Course
  selected: boolean;
  addOrRemoveTutorCourse: (course: Course, add: boolean) => void;
}

export const CourseCatalogueItem: React.FC<Props> = ({ course, selected, addOrRemoveTutorCourse }) => {

  const classes = useStyles({ selected });

  return (
    <Grid item xs={4} onClick={() => addOrRemoveTutorCourse(course, true)}>
      <Paper className={classes.root}>
        {selected ? 
            (<CheckCircleIcon className={`${classes.icon} ${classes.checkIcon}`}/>)
          : (<AddCircleIcon className={`${classes.icon} ${classes.addIcon}`}/>) 
        }
        <Typography className={classes.text}>{course.name}</Typography>
      </Paper>
    </Grid>
  )
}
