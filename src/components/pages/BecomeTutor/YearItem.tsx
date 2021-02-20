// React
import React, { ReactNode } from 'react';

// Components and Interfaces

// Material UI
import { makeStyles, Typography, Paper, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(6),
    width: theme.spacing(16),
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


// Interfaces
interface StyleProps {
  selected: boolean;
}

interface Props {
  year: string;
  selected: boolean;
  setYear: (year: string) => void;
}

export const YearItem: React.FC<Props> = ({ year, selected, setYear }) => {

  // Styles
  const classes = useStyles({ selected });

  return (
    <Paper className={classes.root} onClick={() => setYear(year)}>
      <Typography className={classes.text}>
        {year.split('_').map(year => year.charAt(0).toUpperCase() + year.slice(1)).join(' ')}
      </Typography>
    </Paper>
  )
}
