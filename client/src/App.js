import {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation';
import Home from './Home/Home';
import AlertComponent from './components/layout/Alert/AlertComponent';
import {loaduser} from './Redux/actions/auth';
import "react-datetime/css/react-datetime.css";
// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './Routing/PrivateRoute';
import ProfileForm from './components/layout/ProfileForm/ProfileForm';
import EditProfile from './components/layout/ProfileForm/EditProfile';
import AddExperience from './components/layout/ProfileForm/AddExperience';
import AddEducation from './components/layout/ProfileForm/AddEducation';

if(localStorage.token)
  setAuthToken(localStorage.token);

const App = () => {

  useEffect(() => {
    store.dispatch(loaduser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Navigation />
        
          <AlertComponent />
          
        
          <div className="Content">
          <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create_profile" component={ProfileForm} />
              <PrivateRoute exact path="/edit_profile" component={EditProfile} />
              <PrivateRoute exact path="/add_experience" component={AddExperience} />
              <PrivateRoute exact path="/add_Education" component={AddEducation} />
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
