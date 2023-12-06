import {memo} from "react";
import propTypes from "prop-types";
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";

const translations = {
  ru: {
    button: 'Удалить',
  },
  en: {
    button: 'Remove',
  }
}

function ItemBasket(props) {
  const lang = document.body.dataset.lang || 'ru';

  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}><Link className={cn("link")}
                                         to={`${routesConstants.SUPPLIES}/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{translations[lang].button}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {
  },
};

export default memo(ItemBasket);
