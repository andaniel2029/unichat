// React
import React from 'react';

// Components and Interfaces
import { CourseCatalogueItem } from './CourseCatalogueItem';
import { SelectedCourseItem } from './SelectedCourseItem';
import { useTutorCourses } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
  },

  selectedTutorCoursesContainer: {
    marginTop: '2rem'
  },

  selectedCoursesTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

export const CourseSelect: React.FC = React.memo(() => {

  // Context variables
  const { state: { selectedCoursesInSubject, selectedTutorCourses }, addOrRemoveTutorCourse } = useTutorCourses();

  // Styles
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid container>
        {selectedCoursesInSubject.map(course => {
          let selected = false;
          selectedTutorCourses.forEach(courseItem => {
            if(courseItem.name === course.name) selected = true;
          })
          return (
            <CourseCatalogueItem
              key={course.name}
              course={course}
              selected={selected}
              addOrRemoveTutorCourse={addOrRemoveTutorCourse}
            />
          )
        })}
      </Grid>
      <Grid container className={classes.selectedTutorCoursesContainer}>
        <Grid item xs={12} className={classes.selectedCoursesTitleContainer}>
          <Typography>Selected Courses</Typography>
          <Typography>{selectedTutorCourses.length}</Typography>
        </Grid>
        {selectedTutorCourses.map(course => {
          return (
            <SelectedCourseItem
              key={course.name}
              course={course}
              addOrRemoveTutorCourse={addOrRemoveTutorCourse}
            />
          )
        })}
      </Grid>
    </Grid>
  )
});
