// React
import React from 'react';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  }

}));

interface Props {
  subject: string;
}

export default function SubjectItem(props: Props) {
  return (
    <div>
      <Typography>{props.subject}</Typography>
    </div>
  )
}
