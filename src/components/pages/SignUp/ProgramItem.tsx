// Components and Interfaces
import { Program } from '../../../hooks/useApplicationData';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '100px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    borderRadius: '10px',
    transition: '0.2s ease-in-out',
    '&:hover': {
      color: 'white !important',
      cursor: 'pointer',
      background: '#FF5A5F !important',
    },
    [theme.breakpoints.up('xs')]: {
      height: '65px',
      margin: '0.2rem',
    },
    [theme.breakpoints.up('md')]: {
      height: '65px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '90px',
    }
  },

  text: {
    fontFamily: 'halcom'
  }
}));

interface Props {
  key: number | null;
  program: Program;
  selected: boolean;
  setSelected: any;
}

export default function ProgramItem(props: Props) {

  // Styles
  const classes = useStyles();

  return (
    <Grid 
      item 
      className={classes.root} 
      onClick={() => props.setSelected(props.program.name)} 
      style={{background: props.selected ? '#FF5A5F' : 'white',
              color: props.selected ? 'white' : 'black'}}
    >
      <Typography className={classes.text}>{props.program.name}</Typography> 
    </Grid>
  )
}
