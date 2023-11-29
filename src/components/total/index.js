import React from "react";
import "./style.css";
import PropTypes from "prop-types";

const Total = ({children}) => {
  return (
    <div className="Total">
      {children}
    </div>
  );
};

Total.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Total);
