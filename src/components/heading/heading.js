import PropTypes from "prop-types";
import './style.css'

function Heading({text, variant}) {
  const Tag = variant || 'h1'
  return (
    <Tag className="Heading">{text}</Tag>
  )
}

Heading.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
}

Heading.defaultProps = {
  variant: 'h1'
}

export default Heading
