import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "antd/dist/antd.css";
import './styles/App.css';
import NavContextProvider from './contexts/NavContext';
import UserContextProvider from "./contexts/UserContext";
import AuthContextProvider from './contexts/AuthContext';

import LandingPage from './pages/LandingPage';
import Login from './user/Login';
import Profile from './pages/Profile';
import SignUp from './user/SignUp';
import Budget from './pages/Budget';
import NewBudget from './pages/newBudget';


function App() {
  return (
    <div className="App">
      <Router> <UserContextProvider>
        <AuthContextProvider>
          <NavContextProvider>

            <Route path="/" exact render={() => <LandingPage />} />
            <Route path={`/users/:username`} exact render={() => <Profile />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/signUp" exact render={() => <SignUp />} />
            <Route path={`/users/:username/budget`} exact render={() => <Budget />} />
            <Route path={`/users/:username/newBudget`} exact render={() => <NewBudget />} />

          </NavContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
