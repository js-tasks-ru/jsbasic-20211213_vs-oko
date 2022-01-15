export default class ProductCard {
  constructor(product) {
    this._product = product;
    this.link = '../../assets/images/products/';
    this.elem = document.createElement('div');
    this.elem.className = 'card';
    this.renderTop(product);
    this.renderBody(product);
    this.elem.querySelector('button').addEventListener('click', () => this.onClick());

  }
  renderTop(product) {
    let elemTop = document.createElement('div');
    this.elem.append(elemTop);
    elemTop.className = 'card__top';
    let img = document.createElement('img');
    img.setAttribute('src', this.link + product.image);
    img.setAttribute('alt', 'product');
    img.className = 'card__image';
    elemTop.append(img);

    elemTop.innerHTML += '<span class="card__price">€' + product.price.toFixed(2) + '</span>';
  }
  renderBody(product) {
    let elemBody = document.createElement('div');
    this.elem.append(elemBody);
    elemBody.className = 'card__body';
    elemBody.innerHTML += '<div class="card__title">' + product.name + '</div>' +
      '<button type="button" class="card__button">' +
      '<img src="../../assets/images/icons/plus-icon.svg" alt="icon">' +
      '</button>';
  }
  onClick() {
    let customEvent = new CustomEvent('product-add', { bubbles: true, detail: this._product.id });
    this.elem.dispatchEvent(customEvent);
  }
}
