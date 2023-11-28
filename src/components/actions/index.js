import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Actions = ({children}) => {
  return (
    <div className="Actions">
      {children}
    </div>
  );
};

Actions.propTypes = {
  children: PropTypes.node,
};


export default Actions;
