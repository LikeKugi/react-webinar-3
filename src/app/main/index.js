import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

const translations = {
  ru: {
    title: 'Магазин',
  },
  en: {
    title: 'Store',
  }
}

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.skip]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // пагинация
    changePage: useCallback((page) => {
      store.actions.catalog.setSkip((page - 1) * select.limit);
    }, [store]),
    changeLanguage: useCallback(() => store.actions.lang.toggleLanguage(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head title={translations[select.lang].title} onButtonClick={callbacks.changeLanguage} lang={select.lang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination current={select.skip / select.limit + 1} total={Math.ceil(+select.count / select.limit)} changePage={callbacks.changePage} />
    </PageLayout>

  );
}

export default memo(Main);
