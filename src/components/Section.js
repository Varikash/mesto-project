
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._arrayItems = this._items.reverse();
    this._arrayItems.forEach(item => {
      const newItem = this._renderer(item);
      this.addItem(newItem);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
