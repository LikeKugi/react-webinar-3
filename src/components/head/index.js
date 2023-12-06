import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

const translations = {
  ru: {
    button: 'Switch to English',
  },
  en: {
    button: 'переключить на Русский',
  }
}



function Head({title, onButtonClick, lang}) {

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={onButtonClick}>{translations[lang].button}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onButtonClick: PropTypes.func,
  lang: PropTypes.string,
};

Head.defaultProps = {
  onButtonClick: () => {},
  lang: 'ru',
}

export default memo(Head);
