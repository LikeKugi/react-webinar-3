import StoreModule from "../module";

class CategoriesState extends StoreModule{
  /**
   * Начальное состояние
   * @returns {{categories: Map<any, any>}}
   */
  initState() {
    return {
      categories: new Map(),
      waiting: false,
    };
  }

  async load() {
    this.setState({
      ...this.initState(),
      waiting: true,
    })
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const json = await response.json();
      const categories = new Map()
      json.result.items.forEach(item => {
        if (categories.has(item.parent?._id || null)) {
          categories.set(item.parent?._id || null, [...categories.get(item.parent?._id || null), item])
        } else {
          categories.set(item.parent?._id || null, [item])
        }
      })
      this.setState({
        ...this.getState(),
        categories,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        ...this.initState()
      })
    }
  }
}

export default CategoriesState;
