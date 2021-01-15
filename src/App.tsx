import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './hooks/useAuthContext';
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
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

  const SignUpData:SignUpProps = {
    programs: state.programs,
    error: state.error
  }

  return (
    <Router>
      <AuthProvider>
      <Grid container>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <PrivateRoute exact path="/" component={() => <Home courses={state.courses} error={state.error}/>} />
            <Route path="/signup" component={() => <SignUp {...SignUpData}/>} />
            <Route path="/login" component={Login}/>
          </Switch>
        </Grid>
      </Grid>
      </AuthProvider>
    </Router>
  );
}

