import {useCallback} from "react";
import "./style.css";

function Pagination({current, total, changePage}) {

  const callbacks = {
    // Пагинация
    handleChangePage: useCallback(e => {
      if (!(e.target instanceof HTMLButtonElement)) return;
      changePage(+e.target.textContent);
    }, [changePage])
  };

  let innerContent;

  if (current < 3) {
    innerContent = (<>
      {Array.from({length: 3}, (_, i) => <button className={current === i + 1 ? "active" : ""}
                                                 key={i}>{i + 1}</button>)}
      <span>...</span>
      <button>{total}</button>
    </>);
  } else if (current === total || current + 1 === total) {
    innerContent = (<>
      {<button>1</button>}
      <span>...</span>
      {Array.from({length: 3}, (_, i) => <button className={current === total - 2 + i ? "active" : ""}
                                                 key={i}>{total - 2 + i}</button>)}
    </>);
  } else {
    innerContent = (<>
      <button>1</button>
      {current > 3 && <span>...</span>}
      {Array.from({length: 3}, (_, i) => <button className={current === current + i - 1 ? "active" : ""}
                                                 key={i}>{current + i - 1}</button>)}
      {current < total - 2 && <span>...</span>}
      <button>{total}</button>
    </>);
  }

  return (<div className="Pagination"
               onClick={callbacks.handleChangePage}>
    {innerContent}
  </div>);
}

export default Pagination;
