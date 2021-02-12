// React
import React from 'react';

// Components and Interfaces
import CourseItem from '../Home/CourseItem';
import { CourseRoom } from '../../../hooks/useApplicationData';

// Contexts and Hooks
import { useAppData } from '../../../contexts/AppDataProvider';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  
  titleContainer: {
  },
  
  itemsContainer: {
    borderRadius: '20px',
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  titleText: {
    fontFamily: 'montserrat',
    fontSize: '16pt',
    borderBottom: '2px solid #FF5A5F',
  },
}));

export default React.memo(function OtherRooms() {

  // Styles
  const classes = useStyles();

  // Context variables
  const { rooms } = useAppData();

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={`${classes.titleText}`}>Other Rooms</Typography>
      </div>
      <div className={classes.itemsContainer}>
        {rooms.map((room:CourseRoom) => {
          return (
            <CourseItem 
              key={room.id} 
              room={room}
              home={false}
            />
          )
        })}
      </div>
    </div>
  )
});
