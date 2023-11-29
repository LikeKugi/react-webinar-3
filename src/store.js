
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.setState({
      ...this.state,
      cart: new Map(),
    })
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {

    const addingItemIndex = this.state.list.findIndex(item => item.code === code);
    const addingItem = this.state.list[addingItemIndex];
    const newCart = this.state.cart;

    newCart.set(addingItem, newCart.has(addingItem) ? newCart.get(addingItem) + 1 : 1)

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  removeFromCart(code) {

    const removingItemIndex = this.state.list.findIndex(item => item.code === code);
    const newCart = this.state.cart;
    newCart.delete(this.state.list[removingItemIndex]);

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  /**
   * Количество товаров в корзине
   * @returns {number}
   */
  getTotalCount() {
    return [...this.state.cart.values()].length;
  }

  /**
   * Общая цена товаров в корзине
   * @returns {number}
   */
  getTotalPrice() {
    let totalPrice = 0;
    this.state.cart.forEach((count, item) => {
      totalPrice += count * item.price;
    });
    return totalPrice;
  }

  getCartArray() {
    const itemsArray = [];
    this.state.cart.forEach((count, item) => itemsArray.push({
      ...item,
      count
    }))
    return itemsArray;
  }
}

export default Store;
