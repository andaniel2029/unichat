import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav/Nav';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function App() {

  const classes = useStyles();

  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Nav />
        </Grid>
      </Grid>
    </Router>
  );
}

