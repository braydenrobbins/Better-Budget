import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "antd/dist/antd.css";
import './styles/App.css';
import UserContextProvider from "./contexts/UserContext";

import LandingPage from './pages/LandingPage';
import Login from './user/Login';
import UserPage from './user/UserPage';
import SignUp from './user/SignUp';
import NavContextProvider from './contexts/NavContext';

function App() {
  return (
    <div className="App">
      <Router>
        <NavContextProvider>
          <UserContextProvider>
            <Route path="/" exact render={() => <LandingPage />} />
            <Route path={`/users/:username`} exact render={() => <UserPage />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/signUp" exact render={() => <SignUp />} />
          </UserContextProvider>
        </NavContextProvider>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
