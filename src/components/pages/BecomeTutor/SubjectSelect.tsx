// React
import React from 'react';

// Components and Interfaces
import { SubjectItem } from './SubjectItem';
import { useTutorCourses } from '../../../hooks/useTutorCourses';

// Material UI
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    subjectContainer: {
      display: 'flex',
      justifyContent: props => props.subjects.length === 1 ? 'center' : 'space-between'
    },
  }
}));

interface StyleProps {
  subjects: string[];
}

export const SubjectSelect: React.FC = React.memo(() => {

  // Context variables
  const { state: { subjects, subject }, setSubject } = useTutorCourses();
  // Styles
  const classes = useStyles({ subjects });

  return (
    <Grid container justify="center" className={classes.root}>
      {subjects.map(subjectName => {
        return (
        <SubjectItem
          key={subjectName}
          subject={subjectName}
          selected={subjectName === subject}
          setSubject={setSubject}
        />
      )
      })}
    </Grid>
  )
});
