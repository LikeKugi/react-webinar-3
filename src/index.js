import {createRoot} from 'react-dom/client';
import Store from "./store";
import {StoreContext} from "./store/context";
import {AppRouter} from "./routes";

document.body.dataset.lang = 'en';
const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <AppRouter/>
  </StoreContext.Provider>
);
