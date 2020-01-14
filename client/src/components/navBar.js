import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

function NavBar() {
  return (
    <>
      <Link to="/">
        <Icon type="profile" />Better Budget
      </Link>
      <Link to="/login">
        <Icon type="profile" />Login
      </Link>
    </>
  )
}