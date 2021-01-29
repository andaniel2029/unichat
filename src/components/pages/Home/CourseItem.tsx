import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface StyleProps {
  home: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({

  link: {
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
    animation: '$fadeInSlide 0.4s ease-in-out',
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
  },

  '@keyframes fadeInSlide': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0px)',
    }
  }

}));

interface Props {
  course: any;
  // setRoom: (room: string) => void;
  home: boolean;
}

export default function CourseItem(props: Props) {

  const classes = useStyles(props);
  return (
    <Link to={`/chat?room=${props.course.name}&room_id=${props.course.id}`} className={classes.link}>
      <div 
        className={classes.course} 
        style={{background: `linear-gradient(${props.course.color_gradient}, ${props.course.color_main})`}}
      >
        <Typography className={`${classes.text} ${classes.name}`}>{props.course.name}</Typography>
      </div>
    </Link>
  )
}
