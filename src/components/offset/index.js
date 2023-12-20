import PropTypes from "prop-types";
import './style.css'

function Offset(props) {
  return (<div className="Offset" style={{paddingInlineStart: `${props.offset * 30}px`}}>
    {props.children}
  </div>)
}

Offset.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
}

export default Offset;
