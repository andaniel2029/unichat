// Components and Interfaces
import { User } from '../../../hooks/useAuthContext';

// Material UI
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0rem 0.5rem 1rem',
    transition: '0.2s ease-in-out',
    animation: '$fadeInSlide 0.4s ease-in-out',
    '&:hover': {
      background: '#C7C7C7',
      '& $programName': {
        color: 'white'
      }
    },
  },
  
  text: {
    fontFamily: 'montserrat'
  },
  
  userName: {
    fontWeight: 700,
    fontSize: '16pt',
    color: '#FF5A5F'
  },
  
  programName: {
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
  }
}));

// Interfaces
interface Props {
  user: User
}

export default function RoomUser(props: Props) {

  // Styles
  const classes = useStyles();
  console.log('room user', props.user);

  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.userName}`}>{props.user.firstName} {props.user.lastName}</Typography>
      <Typography className={`${classes.text} ${classes.programName}`}>{props.user.program} Engineering</Typography>
    </div>
  )
}
