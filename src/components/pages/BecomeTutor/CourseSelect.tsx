// React
import React from 'react';

// Components and Interfaces
import { CourseItem } from './CourseItem'
import { Course } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles, Theme, Grid } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
  }
}));


interface Props {
  courses: Course[];
  addOrRemoveTutorCourse: (course: Course, add: boolean) => void;
}

export const CourseSelect: React.FC<Props> = React.memo(({ courses, addOrRemoveTutorCourse }) => {

  // Styles
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      {courses.map(course => {
        return (
          <CourseItem 
            key={course.name}
            course={course}
            selected={false}
            addOrRemoveTutorCourse={addOrRemoveTutorCourse}
          />
        )
      })}
    </Grid>
  )
});
