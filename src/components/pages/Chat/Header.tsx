// Material UI
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    // marginBottom: '2rem',
    background: '#F7F7F7',
    zIndex: 1
  },
  
  text: {
    fontSize: '36pt',
    fontFamily: 'montserrat',
    color: '#585858',
    borderBottom: '2px solid #FF5A5F',
  }

}));

interface Props {
  title: any;
}

export default function Header(props: Props) {

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text}>{props.title.toUpperCase()}</Typography>
    </div>
  )
}
