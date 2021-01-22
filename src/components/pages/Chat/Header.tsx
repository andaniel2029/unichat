import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '140px',
    background: '#F7F7F7'
  },
  
  text: {
    fontSize: '30pt',
    fontFamily: 'montserrat',
    borderBottom: '2px solid #FF5A5F',
  }

}));

interface Props {
  title: any
}

export default function Header(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text}>{props.title.toUpperCase()}</Typography>
    </div>
  )
}
