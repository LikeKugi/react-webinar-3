import {useId, useState} from "react";
import PropTypes from "prop-types";
import './style.css'

function CommentField(props) {
  const inputId = useId();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(text);
    setText('');
  }

  return (<form className="CommentField" onReset={props.onReset} onSubmit={handleSubmit}>
    <label htmlFor={inputId}>
      <strong>{props.label}</strong>
    </label>
    <textarea name="comment"
              id={inputId}
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={props.placeholder}
    ></textarea>
    <div>
      <button type="submit">{props.labelSend}</button>
      {props.labelCancel && <button type="reset">{props.labelCancel}</button>}
    </div>
  </form>);
}

CommentField.propTypes = {
  label: PropTypes.string,
  labelSend: PropTypes.string,
  labelCancel: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
}

CommentField.defaultProps = {
  label: 'Новый комментарий',
  labelSend: 'Отправить',
  labelCancel: '',
  placeholder: 'Текст',
  onSubmit: () => {},
  onReset: () => {},
}

export default CommentField;
