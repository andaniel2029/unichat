import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './hooks/useAuthContext';
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';

import { makeStyles } from '@material-ui/core/styles';
import useApplicationData from './hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({

}));

export default function App() {

  const {
    state
  } = useApplicationData();

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
            <Route path="/signup" component={() => <SignUp programs={state.programs} error={state.error}/>} />
            <Route path="/login" component={Login}/>
          </Switch>
        </Grid>
      </Grid>
      </AuthProvider>
    </Router>
  );
}

