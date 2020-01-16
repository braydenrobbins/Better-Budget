import React, { createContext, useState } from 'react';

export const NavContext = createContext();

function NavContextProvider(props) {
  const [navVis, setNavVis] = useState(false);

  function toggleNav() {
    navVis ? setNavVis(false) : setNavVis(true);
  }

  function updateNavVis(updatedNavVis) {
    setNavVis(updatedNavVis);
  }

  return (
    <NavContext.Provider value={{ toggleNav, navVis, updateNavVis }}>
      {props.children}
    </NavContext.Provider>
  );
}

export default NavContextProvider;
