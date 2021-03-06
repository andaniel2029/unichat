// React
import React from 'react';

// Components and Interfaces
import RoomUser from './RoomUser';
import { User } from '../../../hooks/useAuthContext';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  self: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0rem 0.5rem 1rem',
    transition: '0.2s ease-in-out',
    background: '#F7F7F7',
  },
  
  text: {
    fontFamily: 'montserrat',
  },
  
  userName: {
    fontWeight: 700,
    fontSize: '16pt',
    color: '#FF5A5F'
  },

  titleText: {
    padding: '0.5rem 0rem 0.5rem 1rem',
    fontSize: '20pt',
    color: '#ACABAB',
  },

  programName: {
    color: '#ACABAB',
  }
}));

// Interfaces
interface Props {
  users: User[]
}

export default React.memo(function RoomUsers(props: Props) {

  // Styles
  const classes = useStyles();
  
  // Context variables
  const { currentUser } = useAuth();

  return (
    <div>
      <Typography className={`${classes.text} ${classes.titleText}`}>Participants</Typography>
      <div className={classes.self}>
        <Typography className={`${classes.text} ${classes.userName}`}>{currentUser.firstName} {currentUser.lastName}</Typography>
        <Typography className={`${classes.text} ${classes.programName}`}>{currentUser.program} Engineering</Typography>
      </div>
      {props.users.map(user => {
        return (
          <RoomUser 
            key={user.firstName}
            user={user}
          />
        )
      })}
    </div>
  )
});
