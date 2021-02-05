// React
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Nav from './components/nav/Nav';
import Grid from '@material-ui/core/Grid';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/pages/Chat/Chat';

// Contexts and Hooks
import AuthProvider from './hooks/useAuthContext';
import { SocketProvider } from './contexts/SocketProvider';
import { AppDataProvider } from './contexts/AppDataProvider';
import { CourseProvider } from './contexts/CourseProvider';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';

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
              <Grid container>
                <Grid item xs={12} className={classes.nav}>
                  <Nav />
                </Grid>
                <Grid item xs={12}>
                  <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <CourseProvider>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute path="/chat" component={Chat}/>
                    </CourseProvider>
                  </Switch>
                </Grid>
              </Grid>
          </SocketProvider>
        </AuthProvider>
      </AppDataProvider>
    </Router>
  );
}

