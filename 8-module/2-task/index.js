import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement('<div class="products-grid">\n' +
      '<div class="products-grid__inner">\n' +
      '</div>\n' +
      '</div>');
    this.updateFilter(this.filters);
  }
  productGridRender(productsFiltered) {
    let inner = this.elem.firstElementChild;
    inner.innerHTML = '';
    for (let product of productsFiltered) {
      let card = new ProductCard(product);
      inner.append(card.elem);
    }
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let productsFiltered = this.products;
    if (this.filters.noNuts) {
      productsFiltered = productsFiltered.filter(elem => !elem.nuts);
    }
    if (this.filters.vegeterianOnly) {
      productsFiltered = productsFiltered.filter(elem => elem.vegeterian);
    }
    this.filters.maxSpiciness = this.filters.maxSpiciness || 4;
    productsFiltered = productsFiltered.filter(elem => elem.spiciness <= this.filters.maxSpiciness);
    if (this.filters.category) {
      productsFiltered = productsFiltered.filter(elem => elem.category === this.filters.category);
    }
    this.productGridRender(productsFiltered);
  }
}
