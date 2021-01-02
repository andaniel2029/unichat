import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home';

import { makeStyles } from '@material-ui/core/styles';
import useApplicationData from './hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({

}));

export interface SignUpProps {
  programs: Object
}

export default function App() {

  const {
    programs
  } = useApplicationData();

  console.log('programs', typeof programs);

  const SignUpData:SignUpProps = {
    programs: programs
  }

  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={12}>
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/" component={() => <SignUp {...SignUpData}/>} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

