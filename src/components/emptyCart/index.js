import React from "react";
import './style.css';

const EmptyCart = () => {
  return (
    <h2 className="EmptyCart">
      В корзине нет товаров
    </h2>
  );
};

export default React.memo(EmptyCart);
