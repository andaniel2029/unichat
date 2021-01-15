import Grid from '@material-ui/core/Grid';
import { Course } from '../../../hooks/useApplicationData';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, useScrollTrigger } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  course: {
    height: '150px',
    borderRadius: '20px',
    boxShadow: "1px 4px 5px 2px #EDEDED",
    margin: '1rem',
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
  console.log(props);
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={3} md={2} 
      className={classes.course} 
      style={{background: `linear-gradient(#A2F2BF, ${props.course.color_code})`}}
    >
      <Typography className={`${classes.text} ${classes.name}`}>{props.course.name}</Typography>
    </Grid>
  )
}
