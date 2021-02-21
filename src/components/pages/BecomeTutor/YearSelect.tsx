// React
import React from 'react';

// Components and Interfaces
import { YearItem } from './YearItem';

// Material UI
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles<Theme>((theme: Theme) => ({

  root: {

  }
}));


interface Props {
  years: string[];
  selectedYear: string;
  setYear: (year: string) => void;
}

export const YearSelect: React.FC<Props> = React.memo(({ years, selectedYear, setYear }) => {

  // Styles
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      {years.map(year => {
        return (
        <YearItem
          key={year}
          year={year} 
          selected={year === selectedYear}
          setYear={setYear}
        />
      )
      })}
    </Grid>
  )
});
