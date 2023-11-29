import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import {plural} from "../../utils";

function Controls(props) {
  return (
    <div className="Controls">
      <p><span>В корзине:</span> <strong>{props.totalCount ? `${props.totalCount} ${plural(props.totalCount, {
        one: "товар",
        few: "товара",
        many: "товаров"
      })} / ${props.totalPrice} ₽` : "Пусто"}</strong></p>
        <button onClick={props.onShow}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onShow: PropTypes.func,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

Controls.defaultProps = {
  onShow: () => {
  }
};

export default React.memo(Controls);
