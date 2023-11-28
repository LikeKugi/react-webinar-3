import React, {useCallback, useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";

const Modal = ({children, header, closeModal}) => {

  useEffect(() => {
    document.body.classList.add("no_scroll");
    return () => {
      document.body.classList.remove("no_scroll");
    };
  }, []);

  const cn = bem("Modal");

  const closeHandler = useCallback((e) => {
    if (e.target.closest(".Modal-content")) {
      return;
    }
    closeModal();
  }, []);

  return (
    <div className={cn()}
         onClick={closeHandler}>
      <div className={cn("content")}>
        {header}
        <div className={cn("list")}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  closeModal: PropTypes.func,
};

export default React.memo(Modal);
