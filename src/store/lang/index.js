import StoreModule from "../module";

class Lang extends StoreModule{
  initState() {
    return {
      lang: 'ru'
    }
  }

  toggleLanguage() {
    this.setState({
      lang: this.getState().lang === 'ru' ? 'en' : 'ru',
    })
  }
}

export default Lang;
