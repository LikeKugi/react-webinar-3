import {Routes, Route} from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Root from "./root";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Root/>}>
          <Route index element={<Main/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/articles/:id'} element={<Article/>}/>
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
