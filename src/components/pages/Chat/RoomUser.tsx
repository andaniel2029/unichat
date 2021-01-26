import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({

  
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0rem 0.5rem 1rem',
    transition: '0.2s ease-in-out',
    animation: '$fadeInSlide 0.4s ease-in-out',
    '&:hover': {
      background: '#C7C7C7',
      '& $program': {
        color: 'white'
      }
    },
  },
  
  text: {
    fontFamily: 'montserrat'
  },
  
  name: {
    fontWeight: 700,
    fontSize: '16pt',
    color: '#FF5A5F'
  },
  
  program: {
    color: '#ACABAB',
    transition: '0.2s ease-in-out',
    '&:hover': {
      color: 'white',
    }
  },
  
  
  '@keyframes fadeInSlide': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-10px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0px)',
    }
  },
  
}));

interface Props {
  user: User
}

export default function RoomUser(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.name}`}>{props.user.firstName} {props.user.lastName}</Typography>
      <Typography className={`${classes.text} ${classes.program}`}>{props.user.program} Engineering</Typography>
    </div>
  )
}
