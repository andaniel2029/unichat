// React
import React from 'react';

// Components and Interfaces
import { SubjectItem } from './SubjectItem';

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


interface Props {
  subjects: string[];
  selectedSubject: string;
  setSubject: (subject: string) => void;
}

export const SubjectSelect: React.FC<Props> = React.memo(({ subjects, selectedSubject, setSubject }) => {

  // Styles
  const classes = useStyles({ subjects });

  return (
    <Grid container justify="center" className={classes.root}>
      {subjects.map(subject => {
        return (
        <SubjectItem
          key={subject}
          subject={subject}
          selected={subject === selectedSubject}
          setSubject={setSubject}
        />
      )
      })}
    </Grid>
  )
});
