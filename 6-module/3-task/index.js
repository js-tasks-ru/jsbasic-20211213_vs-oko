export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';
    this.renderTop();
    this.renderSlide(slides);
    this.posSlide = 0;
    this.slideCounter = 1;
    this.buttonLeft.style.display = 'none';
    this.elem.addEventListener('click', () => this.initClick(event));
  }
  renderTop() {
    this.buttonLeft = document.createElement('div');
    this.buttonRight = document.createElement('div');
    this.buttonLeft.className = 'carousel__arrow carousel__arrow_left';
    this.buttonRight.className = 'carousel__arrow carousel__arrow_right';
    this.buttonLeft.innerHTML += '<img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">';
    this.buttonRight.innerHTML += '<img src="../../assets/images/icons/angle-icon.svg" alt="icon">';
    this.elem.append(this.buttonRight);
    this.elem.append(this.buttonLeft);
  }
  renderSlide() {
    this.carouselInner = document.createElement('div');
    this.carouselInner.className = 'carousel__inner';
    this.elem.append(this.carouselInner);
    for (let slideEl of this.slides) {
      this.carouselInner.innerHTML += '<div class="carousel__slide" data-id=' + slideEl.id + '>' +
        '<img src="../../assets/images/carousel/' + slideEl.image + '" class="carousel__img" alt="slide">' +
        '<div class="carousel__caption">' +
        '<span class="carousel__price">€' + slideEl.price.toFixed(2) + '</span>' +
        '<div class="carousel__title">' + slideEl.name + '</div>' +
        '<button type="button" class="carousel__button">' +
        '<img src="../../assets/images/icons/plus-icon.svg" alt="icon">' +
        '</button>' +
        '</div>' +
        '</div>';
    }
  }
  initClick(event) {
    if (event.target.closest('.carousel__button')) {
      let id = event.target.closest('.carousel__slide').dataset.id;
      let customEvent = new CustomEvent('product-add', { bubbles: true, detail: id });
      this.elem.dispatchEvent(customEvent);
    }
    if (event.target.closest('.carousel__arrow')) {
      this.slideTotal = this.slides.length;
      this.slideWidth = this.carouselInner.offsetWidth;
      let el = event.target.closest('.carousel__arrow').classList.contains("carousel__arrow_right");
      if (el) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }

  }
  moveRight() {
    this.posSlide -= this.slideWidth;
    this.slideCounter++;
    if (this.buttonLeft.style.display) {
      this.buttonLeft.style.display = '';
    }
    this.carouselInner.style.transform = 'translateX(' + this.posSlide + 'px)';
    this.buttonRight.style.display = this.slideCounter < this.slideTotal ? '' : 'none';
  }
  moveLeft() {
    this.posSlide += this.slideWidth;
    this.slideCounter--;
    if (this.buttonRight.style.display) {
      this.buttonRight.style.display = '';
    }
    this.carouselInner.style.transform = 'translateX(' + this.posSlide + 'px)';
    this.buttonLeft.style.display = this.slideCounter > 1 ? '' : 'none';
  }
}

