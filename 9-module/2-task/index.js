import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }
  async render() {
    // ... ваш код
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);
    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    let stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);
    let response = await fetch('products.json');
    if (response.ok) {
      //console.log(response.status);
      let products = await response.json();
      //console.log(products);
      this.productsGrid = new ProductsGrid(products);
      let productsGridHolder = document.querySelector('[data-products-grid-holder]');
      productsGridHolder.append(this.productsGrid.elem);
      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });
      this.stepSlider.elem.addEventListener('slider-change', (event) => {
        let value = event.detail;
        this.productsGrid.updateFilter({maxSpiciness: value});});
      document.body.addEventListener('product-add', () => {
        let id = event.detail;
        let productToAdd = products.find((product) => product.id === id);
        this.cart.addProduct(productToAdd);
      });
      this.ribbonMenu.elem.addEventListener('ribbon-select', () => {
        let category = event.detail;
        this.productsGrid.updateFilter({category})});
      let noNutsControl = document.getElementById('nuts-checkbox');
      noNutsControl.addEventListener('change', () => {
        this.productsGrid.updateFilter({ noNuts: event.target.checked });
      });

      let vegetarianOnlyControl = document.getElementById('vegeterian-checkbox');
      vegetarianOnlyControl.addEventListener('change', () => {
        this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
      });
    } else {
      console.log(response.status);
      alert("Ошибка HTTP: " + response.status);
    }

  }
}
