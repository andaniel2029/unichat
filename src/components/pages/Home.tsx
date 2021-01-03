import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../hooks/useAuthContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function Home() {

  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div>
      <Typography>Home Page</Typography>
      <Typography>{currentUser.email}</Typography>
    </div>
  );
}

