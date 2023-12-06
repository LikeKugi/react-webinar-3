import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

const translations = {
  ru: {
    total: 'Итого',
  },
  en: {
    total: 'Total',
  }
}

function BasketTotal({sum, lang}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations[lang].total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
  lang: 'ru'
}

export default memo(BasketTotal);
