import Grid from '@material-ui/core/Grid';
import { Course } from '../../../hooks/useApplicationData';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  course: {
    height: '80px',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    margin: '1rem',
    [theme.breakpoints.up('sm')]: {
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
  course: Course
}

export default function CourseItem(props: Props) {

  const classes = useStyles();
  return (
    <Grid item xs={8} sm={3} md={2} 
      className={classes.course} 
      style={{background: `linear-gradient(${props.course.color_gradient}, ${props.course.color_main})`}}
    >
      <Typography className={`${classes.text} ${classes.name}`}>{props.course.name}</Typography>
    </Grid>
  )
}
