import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import {useCallback, useEffect} from "react";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ItemSupply from "../../components/item-supply";

function Supply() {
  const store = useStore();

  const {id} = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    supply: state.supply,
  }));

  useEffect(() => {
    store.actions.supply.load(id);
  }, [id])

  console.log(select.supply);
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addItemToBasket(item), [store]),

  }
  return (
    <PageLayout>
      <Head title={select.supply.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemSupply item={select.supply} onAdd={callbacks.addToBasket} />
    </PageLayout>
  )
}

export default Supply;
