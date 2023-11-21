/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.setState({
      ...this.state,
      unique_idx: this.makeUniqueIndex()
    });
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
   * Добавление новой записи
   */
  addItem() {
    const unique_idx = this.makeUniqueIndex(this.state.unique_idx);
    this.setState({
      ...this.state,
      unique_idx,
      list: [...this.state.list, {code: unique_idx, title: "Новая запись"}]
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    });
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.targeted = item.targeted ? item.targeted + 1 : 1;
          }
        } else {
          item.selected = false;
        }
        return item;
      })
    });
  }

  /**
   * Создание уникального индекса
   * @param {number?} initial
   * @returns {number}
   */
  makeUniqueIndex(initial) {
    if (initial) {
      return initial + 1;
    }
    if (this.state.list.length > 0 && this.state.list[0].code) {
      return Math.max(...this.state.list.map(el => el.code)) + 1;
    }
    return 1;
  }
}

export default Store;
