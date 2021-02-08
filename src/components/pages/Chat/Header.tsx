// Contexts and Hooks
import { useCourse } from '../../../contexts/CourseProvider';

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
    background: '#F7F7F7',
    zIndex: 1
  },
  
  headerText: {
    fontSize: '40pt',
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

  // Will be modifying CourseProvider to use this object here instead of props
  const { selectedCourse } = useCourse();

  return (
    <div className={classes.root}>
      <Typography className={classes.headerText}>{props.title.toUpperCase()}</Typography>
    </div>
  )
}
