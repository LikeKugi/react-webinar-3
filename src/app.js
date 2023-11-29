import React, {useCallback, useState} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import CartTotal from "./components/cartTotal";
import EmptyCart from "./components/emptyCart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getCartArray();
  const totalCount = store.getTotalCount();
  const totalPrice = store.getTotalPrice();

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
            <List list={cart}
                  onActionItem={callbacks.onDeleteItem}
                  actionDescription="Удалить"/>
            <CartTotal totalPrice={totalPrice} />
          </>) : (<EmptyCart />)}
        </Modal>
      )}
    </>
  );
}

export default App;
