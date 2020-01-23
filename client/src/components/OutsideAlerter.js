import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { NavContext } from '../contexts/NavContext';

function useOutsideAlerter(ref) {
  const { toggleNav, navVis } = useContext(NavContext);
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target) && navVis) {
      toggleNav();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideAlerter;