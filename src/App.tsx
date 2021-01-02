import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home';
import { Program } from './hooks/useApplicationData';

import { makeStyles } from '@material-ui/core/styles';
import useApplicationData from './hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({

}));

export interface SignUpProps {
  programs: Program[]
  error: boolean
}

export default function App() {

  const {
    state
  } = useApplicationData();

  console.log('the fucking state', state);

  const SignUpData:SignUpProps = {
    programs: state.programs,
    error: state.error
  }

  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route path="/" component={() => <SignUp {...SignUpData}/>} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

