import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Comment(props) {
  const cn = bem('Comment');
  const commentDate = new Date(props.dateCreate)

  const dataFromDate = {
    date: commentDate.getDate(),
    month: commentDate.toLocaleString('default', { month: 'long' }),
    year: commentDate.getFullYear(),
    hours: commentDate.getHours(),
    minutes: commentDate.getMinutes()
  }

  const clickHandle = () => {
    props.answer(props._id);
  }

  return (<div className={cn()}>
    <p className={cn('title')}>
      <strong>{props.author.profile.name}</strong>
      <span className={cn('date')}>{`${dataFromDate.date} ${dataFromDate.month} ${dataFromDate.year} в ${dataFromDate.hours}:${dataFromDate.minutes}`}</span>
    </p>
    <p className={cn('text')}>{props.text}</p>
    <p>
      <span className={cn('answer')} onClick={clickHandle}>Ответить</span>
    </p>
  </div>)
}

Comment.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  dateCreate: PropTypes.string,
  author: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.shape({
      name: PropTypes.string,
    })
  }),
  parent: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string,
  }),
  isDeleted: PropTypes.bool,
  offset: PropTypes.number,
  answer: PropTypes.func,
}

Comment.defaultProps = {
  answer: () => {},
}

export default Comment;
