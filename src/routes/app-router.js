import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from "../app";
import Main from "../app/main";
import {routesConstants} from "./routes.constants";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={routesConstants.INDEX} element={<App />}>
    <Route index element={<Main/>}/>
    <Route path={`${routesConstants.SUPPLIES}${routesConstants.SUPPLY_ID}`} element={<></>}/>
  </Route>
))

export const AppRouter = () => {
  return (<RouterProvider router={router} />)
}
