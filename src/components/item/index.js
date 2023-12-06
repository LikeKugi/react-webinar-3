import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";

const translations = {
  ru: {
    button: 'Добавить',
  },
  en: {
    button: 'Add',
  }
}

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link className={cn('link')} to={`${routesConstants.SUPPLIES}/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translations[props.lang].button}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  lang: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  lang: 'ru',
}

export default memo(Item);
