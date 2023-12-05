import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      limit: 10,
      skip: 0,
      count: 0,
    }
  }

  setSkip(skip) {
    this.setState({
      ...this.getState(),
      skip,
    })
  }

  async load() {
    const {limit, skip} = this.getState();
    const queryParams = new URLSearchParams({
      limit,
      skip,
      fields: 'items(_id,title,price),count'
    })
    const response = await fetch('/api/v1/articles'+`?${queryParams.toString()}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
