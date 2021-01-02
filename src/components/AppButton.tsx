import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { BtnInput} from './nav/Nav';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'halcom',
    color: 'white',
    background: '#FF5A5F',
    width: '100px',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
    },
  },

  link: {
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
  }
}));

export default function AppButton(props: BtnInput) {

  const classes = useStyles();

  return (
    <Link to={props.url} className={classes.link}>
      <Button variant="contained" className={classes.root}>{props.text}</Button>  
    </Link>
  )
}
