import {memo} from "react";
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

  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}><Link className={cn("link")}
                                         to={`${routesConstants.SUPPLIES}/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{translations[props.lang].button}</button>
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
  onRemove: PropTypes.func,
  lang: PropTypes.string,
};

ItemBasket.defaultProps = {
  onRemove: () => {
  },
  lang: 'ru'
};

export default memo(ItemBasket);
