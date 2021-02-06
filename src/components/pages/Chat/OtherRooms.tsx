// React
import React from 'react';

// Components and Interfaces
import CourseItem from '../Home/CourseItem';

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

  title: {
    fontFamily: 'montserrat',
    fontSize: '16pt',
    borderBottom: '2px solid #FF5A5F',
  },
  
}));

export default React.memo(function OtherRooms() {

  const classes = useStyles();
  const { courses } = useAppData();

  console.log('OtherRooms is rendering');

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={`${classes.title}`}>Other Rooms</Typography>
      </div>
      <div className={classes.itemsContainer}>
        {courses.map((course:any) => {
          return (
            <CourseItem 
              key={course.id} 
              course={course}
              home={false}
            />
          )
        })}
      </div>
    </div>
  )
});
