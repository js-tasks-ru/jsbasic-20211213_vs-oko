export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (!product)
      return;
    let item = this.cartItems.find(item => item.product === product);

    if (item) {
      item.count += 1;
    } else {
      item = {
        product: product,
        count: 1
      };
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let item = this.cartItems.find(el => el.product.id === productId);
    item.count += amount;
    if (!item.count) {
      this.cartItems.splice(this.cartItems.indexOf(item),1);
    }
    this.onProductUpdate(item);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    //return this.cartItems.length
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }
  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((totalPrice, item) => totalPrice + (item.product.price * item.count), 0);
  }


  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

