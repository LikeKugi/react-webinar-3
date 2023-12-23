import PropTypes from "prop-types";
import './style.css'

function Offset(props) {
  const offset = props.offset < 9 ? props.offset : 9
  return (<div className="Offset" style={{paddingInlineStart: `${offset * 30}px`}}>
    {props.children}
  </div>)
}

Offset.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
}

export default Offset;
