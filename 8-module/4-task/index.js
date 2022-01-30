import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!product)
      return;
    let item = this.cartItems.find(item => item.product === product);

    if (item) {
      item.count += 1;
    } else {
      item = {
        product,
        count: 1
      };
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let item = this.cartItems.find(el => el.product.id === productId);
    item.count += amount;
    if (!item.count) {
      this.cartItems.splice(this.cartItems.indexOf(item), 1);
    }
    this.onProductUpdate(item);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((totalPrice, item) => totalPrice + (item.product.price * item.count), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="../../assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modalClass = new Modal();
    this.modalClass.setTitle('Your order');
    let bodyElem = document.createElement('div');

    for (let elem of this.cartItems) {
      bodyElem.append(this.renderProduct(elem.product, elem.count));
    }
    bodyElem.append(this.renderOrderForm());
    this.modalClass.setBody(bodyElem);
    this.modalClass.open();
    this.modalClass.body.onclick = () => this.initModalClickEvent(event);
    this.modalClass.modal.querySelector('.cart-form').addEventListener('submit', () => this.onSubmit(event));
  }
  initModalClickEvent(event) {
    if (event.target.closest('.cart-counter__button_plus')) {
      let itemID = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(itemID, 1);
    }
    if (event.target.closest('.cart-counter__button_minus')) {
      let itemID = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(itemID, -1);


    }

  }
  onProductUpdate(item) {
    // ...ваш код
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      if (!item.count) {
        this.modalClass.modal.querySelector(`[data-product-id="${item.product.id}"]`).remove();
      } else {
        let productCount = this.modalClass.modal.querySelector(`[data-product-id="${item.product.id}"] .cart-counter__count`);
        productCount.textContent = item.count;
        let productPrice = this.modalClass.modal.querySelector(`[data-product-id="${item.product.id}"] .cart-product__price`);
        productPrice.textContent = '€' + (item.product.price * item.count);
        this.modalClass.modal.querySelector('.cart-buttons__info-price').textContent = '€' + this.getTotalPrice().toFixed(2);
      }
      if (this.isEmpty()) {
        this.modalClass.close();
      }
    }
  }
  onSubmit(event) {
    // ...ваш код
    console.log('submit');
    event.preventDefault();
    let form = this.modalClass.modal.querySelector('.cart-form');
    let userFormData = new FormData(form);
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: userFormData,
    }).then((response) => {
      if (response.ok) {
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modalClass.setTitle('Success!');
        this.modalClass.body.firstChild.innerHTML = '<div class="modal__body-inner">\n' +
            '  <p>\n' +
            '    Order successful! Your order is being cooked :) <br>\n' +
            '    We’ll notify you about delivery time shortly.<br>\n' +
            '    <img src="../../assets/images/delivery.gif">\n' +
            '  </p>\n' +
            '</div>';}
    })
      .catch(error => console.log(error));
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

