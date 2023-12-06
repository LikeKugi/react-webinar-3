import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

const translations = {
  ru: {
    button: 'Добавить',
  },
  en: {
    button: 'Add',
  }
}

function Controls({onAdd}) {
  const lang = document.body.dataset.lang || 'ru';
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translations[lang].button}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
