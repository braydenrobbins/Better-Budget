import React, { createContext, useState } from 'react';

export const NavContext = createContext();

function NavContextProvider(props) {
  const [navVis, setNavVis] = useState(false);

  function toggleNav() {
    navVis ? setNavVis(false) : setNavVis(true);
  }

  return (
    <NavContext.Provider value={{ toggleNav, navVis }}>
      {props.children}
    </NavContext.Provider>
  );
}

export default NavContextProvider;
