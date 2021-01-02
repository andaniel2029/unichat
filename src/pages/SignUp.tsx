import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function SignUp() {

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Nav />
      </Grid>
    </Grid>
  );
}

