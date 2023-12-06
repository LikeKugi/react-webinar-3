import useSelector from "../../store/use-selector";
import Basket from "../basket";
import {Outlet} from "react-router-dom";

function RootPage() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket/>}
    </>)

}

export default RootPage;
