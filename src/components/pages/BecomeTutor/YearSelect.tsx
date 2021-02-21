// React
import React from 'react';

// Components and Interfaces
import { YearItem } from './YearItem';

// Context and hooks
import { useTutorCourses } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
  }
}));

export const YearSelect: React.FC = React.memo(() => {

  // Context variables
  const { state: { allCourses, year }, setYear } = useTutorCourses();

  // Styles
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      {(Object.keys(allCourses)).map(yearName => {
        return (
        <YearItem
          key={yearName}
          year={yearName} 
          selected={yearName === year}
          setYear={setYear}
        />
      )
      })}
    </Grid>
  )
});
