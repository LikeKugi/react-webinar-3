import React from "react";
import Actions from "../actions";
import {formatCurrency} from "../../utils";
import Total from "../total";
import PropTypes from "prop-types";
import './style.css';

const CartTotal = ({totalPrice}) => {
  return (
    <Total>
      <Actions>
        <strong className="CartTotal-bold">Итого</strong>
        <strong className="CartTotal-bold">{`${formatCurrency(totalPrice)}`}</strong>
        <div/>
      </Actions>
    </Total>
  );
};

CartTotal.propTypes = {
  totalPrice: PropTypes.number,
}

export default CartTotal;
