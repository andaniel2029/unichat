import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'halcom',
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    borderRadius: '20px',
    '&:hover': {
    }
  }
}));

export default function JoinButton() {

  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.root}>Join</Button>
  )
}
