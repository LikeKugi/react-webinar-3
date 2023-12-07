import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import {useCallback, useEffect, useState} from "react";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ItemSupply from "../../components/item-supply";

function Supply() {
  const store = useStore();
  const [loading, setLoading] = useState(false);

  const {id} = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    supply: state.supply,
    lang: state.lang.lang,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await store.actions.supply.load(id);
      setLoading(false);
    }
    fetchData();
    return () => {
      store.actions.supply.initState();
    }
  }, [id])

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addItemToBasket(item), [store]),
    changeLanguage: useCallback(() => store.actions.lang.toggleLanguage(), [store]),

  }
  return (
    <PageLayout>
      <Head title={select.supply.title} lang={select.lang} onButtonClick={callbacks.changeLanguage} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      {!loading && <ItemSupply item={select.supply}
                               onAdd={callbacks.addToBasket} lang={select.lang}/>}
    </PageLayout>
  )
}

export default Supply;
