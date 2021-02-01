import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './hooks/useAuthContext';
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { SocketProvider } from './contexts/SocketProvider';
import { AppDataProvider } from './contexts/AppDataProvider';
import { CourseProvider } from './contexts/CourseProvider';
import Chat from './components/pages/Chat/Chat';

const useStyles = makeStyles((theme:Theme) => ({

  nav: {
    height: '6vh',
    padding: '20px'
  }

}));

export default function App() {

  const classes = useStyles();

  return (
    <Router>
      <AppDataProvider>
        <AuthProvider>
          <SocketProvider>
            <CourseProvider>
              <Grid container>
                <Grid item xs={12} className={classes.nav}>
                  <Nav />
                </Grid>
                <Grid item xs={12}>
                  <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute path="/chat" component={Chat}/>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                  </Switch>
                </Grid>
              </Grid>
            </CourseProvider>
          </SocketProvider>
        </AuthProvider>
      </AppDataProvider>
    </Router>
  );
}

