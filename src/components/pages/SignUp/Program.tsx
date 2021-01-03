import { Program } from '../../../hooks/useApplicationData';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

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
    // background: props => props.selected ? '#FF5A5F' : 'white',
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

  typography: {
    fontFamily: 'halcom'
  }
}));

export default function ProgramItem(props: any) {

  const classes = useStyles(props);
  // console.log('program', props);



  return (
    <Grid 
      item 
      className={classes.root} 
      onClick={() => props.setSelected(props.name)} 
      style={{background: props.selected ? '#FF5A5F' : 'white',
              color: props.selected ? 'white' : 'black'}}
    >
      <Typography className={classes.typography}>{props.name}</Typography> 
    </Grid>
  )
}
