// React
import React from 'react';

// Components and Interfaces
import TutorCourseItem from './TutorCourseItem';
import { Tutor } from './Home';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '150px',
    width: '180px',
    borderRadius: '20px',
    boxShadow: '1px 4px 5px 2px #EDEDED',
    padding: '10px',
    margin: '1rem',
  },

  text: {
    fontFamily: 'halcom'
  },

  coursesContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
  }

}));

interface Props {
  tutor: Tutor
}

export default function TutorItem(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text}>{props.tutor.name}</Typography>
      <div className={classes.coursesContainer}>
        {props.tutor.courses.map((course: string) => {
          return <TutorCourseItem course={course}/>
        })}
      </div>   
    </div>
  )
}
