import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import "./style.css";

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
      <p>Страна производитель: <strong>{props.item.madeIn.title} ({props.item.madeIn.code})</strong></p>
      <p>Категория: <strong>{props.item.category.title}</strong></p>
      <p>Год выпуска: <strong>{props.item.edition}</strong></p>
      <h2>Цена: {numberFormat(props.item.price)} ₽</h2>
      <button onClick={callbacks.onAdd}>Добавить</button>
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
};

ItemSupply.defaultProps = {
  onAdd: () => {
  }
};

export default ItemSupply;
