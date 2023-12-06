import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";

const translations = {
  ru: {
    link: 'Главная',
    cart: 'В корзине:',
    button: 'Перейти',
    one: 'товар',
    few: 'товара',
    many: 'товаров',
    empty: 'пусто'
  },
  en: {
    link: 'Main',
    cart: 'In Cart:',
    button: 'Go to Cart',
    one: 'item',
    few: 'items',
    many: 'items',
    empty: 'empty'
  }
}

function BasketTool({sum, amount, onOpen}) {
  const lang = document.body.dataset.lang || 'ru';
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={routesConstants.INDEX} >{translations[lang].title}</Link>
      <div>
        <span className={cn("label")}>{translations[lang].cart}</span>
        <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translations[lang].one,
            few: translations[lang].few,
            many: translations[lang].many,
          })} / ${numberFormat(sum)} ₽`
          : translations[lang].empty
        }
      </span>
        <button onClick={onOpen}>{translations[lang].button}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
