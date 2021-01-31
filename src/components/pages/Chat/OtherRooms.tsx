import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CourseItem from '../Home/CourseItem';
import { useAppData } from '../../../contexts/AppDataProvider';



const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },

  titleContainer: {
  },

  itemsContainer: {
    borderRadius: '20px',
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
  const { courses } = useAppData();

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={`${classes.title}`}>Other Rooms</Typography>
      </div>
      <div className={classes.itemsContainer}>
        {courses.map((course:any) => {
          return <CourseItem key={course.id} course={course} home={false} />
        })}
      </div>
    </div>
  )
}
