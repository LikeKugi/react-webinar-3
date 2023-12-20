import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function CommentFallback(props) {
  const cn = bem('CommentFallback');
  return (<p className={cn()}>
    <span className={cn('signin')} onClick={props.signInAction}>{props.loginLabel}</span>{props.text}{!!props.reset && <span className={cn('reset')} onClick={props.resetAction}>{props.reset}</span>}
  </p>)
}

CommentFallback.propTypes = {
  loginLabel: PropTypes.string,
  text: PropTypes.string,
  reset: PropTypes.string,
  resetAction: PropTypes.func,
  signInAction: PropTypes.func,
}

CommentFallback.defaultProps = {
  resetAction: () => {},
  signInAction: () => {},
}

export default CommentFallback;
