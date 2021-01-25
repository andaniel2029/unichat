import Grid from '@material-ui/core/Grid';
// import { Course } from '../../../hooks/useApplicationData';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => ({

  link: {
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
  },

  course: {
    height: '80px',
    width: '300px',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    margin: '1rem',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
      height: '150px',
    }
  },

  text: {
    fontFamily: 'montserrat',
  },

  name: {
    position: 'relative',
    top: '10px',
    left: '10px',
    color: 'white',
    fontWeight: 700,
    fontSize: '16pt'
  }

}));

interface Props {
  course: any;
  setRoom: (room: string) => void;
}

export default function CourseItem(props: Props) {

  const classes = useStyles();
  return (
    <Link to={`/chat?room=${props.course.name}&id=${props.course.id}`} className={classes.link}>
      <Grid item 
        className={classes.course} 
        style={{background: `linear-gradient(${props.course.color_gradient}, ${props.course.color_main})`}}
      >
        <Typography className={`${classes.text} ${classes.name}`}>{props.course.name}</Typography>
      </Grid>
    </Link>
  )
}
