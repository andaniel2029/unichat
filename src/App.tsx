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
}

export default function App() {

  const {
    programs
  } = useApplicationData();

  const SignUpData:SignUpProps = {
    programs: programs
  }

  console.log(programs.map(program => {
    console.log(program.id);
  }));

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

