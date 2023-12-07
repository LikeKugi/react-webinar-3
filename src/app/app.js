import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {routesConstants} from "../routes";
import RootPage from "./root-page";
import Main from "./main";
import Supply from "./supply";
import NotFound from "./not-found";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={routesConstants.INDEX} element={<RootPage />}>
    <Route index element={<Main/>}/>
    <Route path={`${routesConstants.SUPPLIES}${routesConstants.SUPPLY_ID}`} element={<Supply />}/>
    <Route path={routesConstants.NOT_FOUND} element={<NotFound />}/>
  </Route>
))

function AppRouter() {
  return (<RouterProvider router={router} />)
}

export default AppRouter;
