import PropTypes from 'prop-types';
import './style.css'
function FormLayout({children, onSubmit}) {
  return (<form onSubmit={onSubmit} className="FormLayout">
    {children}
  </form>)
}

FormLayout.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

FormLayout.defaultProps = {
  onSubmit: () => {},
}

export default FormLayout;
