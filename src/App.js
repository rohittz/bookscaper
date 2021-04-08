import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import Privateroute from './Components/PrivateRoute/Privateroute';
import Orders from './Components/Orders/Orders';
import Home from './Components/Home/Home';
export const userContext = createContext();
export const historyContext = createContext();
function App() {
  document.body.style.backgroundColor = "var(--main-back-color)";
  const [loggedInUser, setLoggedInUser] = useState({});
  const [currComp, setCurrComp] = useState("/home");
  return (
    <div className="app">
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <historyContext.Provider value={[currComp, setCurrComp]}>
          <Router>
            <div className="fixed">
              <Header></Header>
            </div>
            <div className="down-header">
            </div>
            <div className="main-content">
              <Switch>
                <Route path='/home'>
                  <Home></Home>
                </Route>
                <Route exact path="/">
                  <Home></Home>
                </Route>
                <Route path='/login'>
                  <Login></Login>
                </Route>
                <Privateroute path='/admin'>
                  <Admin></Admin>
                </Privateroute>
                <Privateroute path='/orders'>
                  <Orders></Orders>
                </Privateroute>
                <Route path="/*">
                  <Home></Home>
                </Route>
              </Switch>
            </div>
          </Router>
        </historyContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
