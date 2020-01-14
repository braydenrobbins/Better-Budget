import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Icon } from "antd";
import { Link } from 'react-router-dom';

import "antd/dist/antd.css";
import './styles/App.css';
import UserContextProvider from "./contexts/UserContext";

import LandingPage from './LandingPage';
import Login from './Login';
import UserPage from './UserPage';
import SignUp from './SignUp';

function App() {
  const { Header } = Layout;
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <Layout>
            <Header >
              <Link to="/">
                <Icon type="profile" />Better Budget
              </Link>
              <Link to="/login">
                <Icon type="profile" />Login
              </Link>
            </Header>
            <Route path="/" exact render={() => <LandingPage />} />
            <Route path={`/users/:username`} exact render={() => <UserPage />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/signUp" exact render={() => <SignUp />} />
          </Layout>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
