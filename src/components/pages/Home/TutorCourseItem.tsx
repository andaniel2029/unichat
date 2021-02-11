// React
import { Fragment } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontFamily: 'montserrat'
  }
}));

interface Props {
  course: string;
}

export default function TutorItem(props: Props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.text}>{props.course}</Typography>
    </Fragment>
  )
}
