import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function ArticleComments(props) {
  const cn = bem('ArticleComments')
  return (<div className={cn()}>
    <p className={cn('title')}>{props.title}</p>
    {props.children}
  </div>)
}

ArticleComments.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default ArticleComments
