import StoreModule from "../module";

class Supply extends StoreModule {

  initState() {
    return {
      _id: "",
      title: "",
      description: "",
      price: 0,
      madeIn: {
        title: "",
        code: ""
      },
      edition: 0,
      category: {
        title: "",
      }
    };
  }

  async load(id) {
    const queryParams = new URLSearchParams({
      fields: "*,madeIn(title,code),category(title)",
    });
    const response = await fetch(`/api/v1/articles/${id}?${queryParams.toString()}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      _id: json.result._id,
      title: json.result.title,
      description: json.result.description,
      price: json.result.price,
      madeIn: {
        title: json.result.madeIn.title,
        code: json.result.madeIn.code,
      },
      edition: json.result.edition,
      category: {
        title: json.result.category.title,
      }
    });
  }
}

export default Supply;
