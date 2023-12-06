import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import "./style.css";
import {memo} from "react";

const translations = {
  ru: {
    country: 'Страна производитель: ',
    category: 'Категория: ',
    edition: 'Год выпуска: ',
    price: 'Цена: ',
    button: 'Добавить'
  },
  en: {
    country: 'Made In: ',
    category: 'Category: ',
    edition: 'Year Edition: ',
    price: 'Price: ',
    button: 'Add'
  }
}

function ItemSupply(props) {

  const callbacks = {
    onAdd: () => props.onAdd({
      _id: props.item._id,
      price: props.item.price,
      title: props.item.title,
    })
  };

  return (
    <div className="ItemSupply">
      <p>{props.item.description}</p>
      <p>{translations[props.lang].country}<strong>{props.item.madeIn.title} ({props.item.madeIn.code})</strong></p>
      <p>{translations[props.lang].category}<strong>{props.item.category.title}</strong></p>
      <p>{translations[props.lang].edition}<strong>{props.item.edition}</strong></p>
      <h2>{translations[props.lang].price}{numberFormat(props.item.price)} ₽</h2>
      <button onClick={callbacks.onAdd}>{translations[props.lang].button}</button>
    </div>);
}

ItemSupply.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  onAdd: PropTypes.func,
  lang: PropTypes.string,
};

ItemSupply.defaultProps = {
  onAdd: () => {
  },
  lang: 'ru',
};

export default memo(ItemSupply);
