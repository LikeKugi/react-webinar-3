import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from "../app";
import {routesConstants} from "./routes.constants";
import NotFound from "../pages/not-found";
import Supply from "../pages/supply";
import Main from "../app/main";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={routesConstants.INDEX} element={<App />}>
    <Route index element={<Main/>}/>
    <Route path={`${routesConstants.SUPPLIES}${routesConstants.SUPPLY_ID}`} element={<Supply />}/>
    <Route path={routesConstants.NOT_FOUND} element={<NotFound />}/>
  </Route>
))

function AppRouter() {
  return (<RouterProvider router={router} />)
}

export default AppRouter;
