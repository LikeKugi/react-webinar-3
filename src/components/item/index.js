import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import Actions from "../actions";
import {formatCurrency} from "../../utils";

function Item(props) {

  const callbacks = {
    onAction: () => {
      props.onButtonClick(props.item.code);

    }
  };
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>
        {props.item.title}
      </div>
      <Actions>
        <div>
          {`${formatCurrency(props.item.price)}`}
        </div>
        {!!props.item.count && (<div>
          {`${props.item.count} шт`}
        </div>)}
        <div>
          <button onClick={callbacks.onAction}>
            {props.buttonDescription}
          </button>
        </div>
      </Actions>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onButtonClick: PropTypes.func,
  buttonDescription: PropTypes.string,
};

Item.defaultProps = {
  onButtonClick: () => {
  },
};

export default React.memo(Item);
