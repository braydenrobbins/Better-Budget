import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

function LandingPage() {

  return (
    <>
      <Link to="/login">
        <h1><Icon type="profile" />Login</h1>
      </Link>
    </>
  )
}

export default LandingPage;