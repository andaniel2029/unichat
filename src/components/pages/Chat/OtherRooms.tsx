import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppData } from '../../../contexts/AppDataProvider';
import CourseItem from '../Home/CourseItem';



const useStyles = makeStyles((theme) => ({

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

export default function OtherRooms() {

  const classes = useStyles();
  const [selected, setSelected] = useState('');
  const { courses } = useAppData();


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
              // selected={course.name === selected}
              setSelected={setSelected}
            />
          )
        })}
      </div>
    </div>
  )
}
