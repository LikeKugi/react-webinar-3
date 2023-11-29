import React, {useCallback, useState} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Actions from "./components/actions";
import Total from "./components/total";
import {formatCurrency} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const totalCount = list.reduce((a, item) => item.count > 0 ? a + 1 : a, 0);
  const totalPrice = list.reduce((a, item) => item.count > 0 ? a + item.count * item.price : a, 0);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onShowCart: useCallback(() => {
      setShowModal(true);
    }, []),

    onCloseCart: useCallback(() => {
      setShowModal(false);
    }, []),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин"/>
        <Controls onShow={callbacks.onShowCart}
                  totalCount={totalCount}
                  totalPrice={totalPrice}/>
        <List list={list.map(item => ({
          code: item.code,
          title: item.title,
          price: item.price,
        }))}
              onActionItem={callbacks.onAddItem}
              actionDescription="Добавить"/>
      </PageLayout>
      {showModal && (
        <Modal closeModal={callbacks.onCloseCart}
               header={(<Head title={"Корзина"}>
                 <button onClick={callbacks.onCloseCart}>Закрыть</button>
               </Head>)}>
          {!!totalCount ? (<>
            <List list={list.filter(item => item.count)}
                  onActionItem={callbacks.onDeleteItem}
                  actionDescription="Удалить"/>
            <Total>
              <Actions>
                <strong>Итого</strong>
                <strong>{`${formatCurrency(totalPrice)}`}</strong>
                <div/>
              </Actions>
            </Total>
          </>) : (<h2>В корзине нет товаров</h2>)}
        </Modal>
      )}
    </>
  );
}

export default App;
