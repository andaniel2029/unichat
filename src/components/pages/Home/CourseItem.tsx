import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Course } from '../../../hooks/useApplicationData';

interface StyleProps {
  home: boolean;
  course: Course;
  selected?: boolean;
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
    transition: '0.2s ease-in-out',
    color: props => props.home ? 'white' : '#ACABAB',
    borderRadius: props => props.home ?  '20px' : 'none',
    // background: props => props.home ? `linear-gradient(${props.course.color_gradient}, ${props.course.color_main})` : 'white',
    background: props => props.home ? 
    `linear-gradient(${props.course.color_gradient}, ${props.course.color_main})` : (
      props.selected ? 'black': 'white'
    ),
    boxShadow: props => props.home ? "1px 4px 5px 2px #EDEDED" : 'none',
    margin: props => props.home ? '1rem' : 'none',
    [theme.breakpoints.up('sm')]: {
      width: props => props.home ? '200px' : '100%',
      height: props => props.home ? '150px' : '50px'
    },
    '&:hover': {
      background: props => props.home ? 'null' : '#FF5A5F',
      color: props => props.home ? 'null' : 'white'
    }
  },

  text: {
    fontFamily: 'montserrat',
  },

  name: {
    fontWeight: 700,
    fontSize: '16pt',
    maxWidth: '75%',
    padding: '10px',
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
  home: boolean;
  // selected?: boolean;
  setSelected?: (selected: string) => void;
}

export default function CourseItem(props: Props, { location }: RouteComponentProps) {
  
  const classes = useStyles(props);
  return (
    <Link 
      to={`/chat?room=${props.course.name}&room_id=${props.course.id}`} 
      className={classes.link}
    >
      <div 
        className={classes.course}
      >
        <Typography className={`${classes.text} ${classes.name}`}>{props.course.name}</Typography>
      </div>
    </Link>
  )
}
