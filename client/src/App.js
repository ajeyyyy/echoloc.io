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
// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import setAuthToken from './utils/setAuthToken';

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
          <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
