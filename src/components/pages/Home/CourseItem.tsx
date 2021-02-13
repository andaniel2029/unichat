// React
import { Link } from 'react-router-dom';

// Contexts and Hooks
// import { CourseRoom } from '../../../hooks/useApplicationData';
import { useCourse } from '../../../contexts/CourseProvider';

// Material UI
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';


interface StyleProps {
  home: boolean;
  room: any;
  selectedCourse: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  courseLink: {
    textDecoration: 'none',
    '&:visited': {
      textDecoration: 'none',
    },
    animation: '$fadeInSlide 0.4s ease-in-out',
  },

  courseCard: {
    height: '80px',
    width: '300px',
    transition: '0.2s ease-in-out',
    borderRadius: props => props.home ?  '20px' : 'none',
    background: props => props.home ? 
    `linear-gradient(${props.room.color_gradient}, ${props.room.color_main})` : (
      props.selectedCourse === props.room.name ? '#FF5A5F': 'white'
      ),
      color: props => props.home ? 
      'white' : (
        props.selectedCourse === props.room.name ? 'white': '#ACABAB'
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

  courseText: {
    fontFamily: 'montserrat',
  },

  courseName: {
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

// Interfaces
interface Props {
  room: any;
  home: boolean;
}

export default function CourseItem(props: Props) {
  
  // Context variables
  const { selectedCourse, setSelectedCourse } = useCourse();

  // Styles
  const classes = useStyles({ ...props, selectedCourse });

  return (
    <Link 
      to={`/chat?room=${props.room.name}&room_id=${props.room.id}`} 
      className={classes.courseLink}
      onClick={() => setSelectedCourse(props.room.name)}
    >
      <div 
        className={classes.courseCard}
      >
        <Typography className={`${classes.courseText} ${classes.courseName}`}>{props.room.name}</Typography>
      </div>
    </Link>
  )
}
