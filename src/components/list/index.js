import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import {cn as bem} from "@bem-react/classname";

function List(props) {
  const cn = bem("List");

  return (
    <div className="List">{
      props.list.map(item =>
        <div key={item.code}
             className={cn("item")}>
          <Item item={item}
                onButtonClick={props.onActionItem}
                buttonDescription={props.actionDescription}/>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onActionItem: PropTypes.func,
  actionDescription: PropTypes.string,
};

List.defaultProps = {
  onActionItem: () => {
  },
};

export default React.memo(List);
