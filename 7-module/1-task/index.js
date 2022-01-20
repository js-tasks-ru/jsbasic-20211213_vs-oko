export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';
    this.renderTop();
    this.renderNav();
    this.elem.addEventListener('click', () => this.initClick(event));
    this.navCat.addEventListener('scroll', () => this.scrollButtonsHide(event));
  }
  renderTop() {
    this.buttonLeft = document.createElement('button');
    this.buttonRight = document.createElement('button');
    this.buttonLeft.className = 'ribbon__arrow ribbon__arrow_left';
    this.buttonRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    this.buttonLeft.innerHTML += '<img src="../../assets/images/icons/angle-icon.svg" alt="icon">';
    this.buttonRight.innerHTML += '<img src="../../assets/images/icons/angle-icon.svg" alt="icon">';
    this.navCat = document.createElement('nav');
    this.navCat.className = 'ribbon__inner';
    this.elem.append(this.buttonRight);
    this.elem.append(this.navCat);
    this.elem.append(this.buttonLeft);
  }
  renderNav() {
    let i = 0;
    for (let slide of this.categories) {
      let classAdd = !i ? 'ribbon__item ribbon__item_active' : 'ribbon__item';
      this.navCat.innerHTML += `<a href="#" class="${classAdd}" data-id=${slide.id}>${slide.name}</a>`;
      i++;
    }
  }
  initClick(event) {
    if (event.target.closest('.ribbon__item')) {
      let id = event.target.closest('.ribbon__item').dataset.id;
      let customEvent = new CustomEvent('ribbon-select', { bubbles: true, detail: id });
      this.elem.dispatchEvent(customEvent);
      this.selectEl(event);
    }
    if (event.target.closest('.ribbon__arrow')) {
      let el = event.target.closest('.ribbon__arrow').classList.contains("ribbon__arrow_right");
      if (el) {
        this.navCat.scrollBy(350, 0);
      } else {
        this.navCat.scrollBy(-350, 0);
      }
    }
  }
  selectEl (event) {
    let navList = event.target.closest('.ribbon__inner').children;
    for (let el of navList) {
      el.className = 'ribbon__item';
    }
    event.target.classList.add('ribbon__item_active');
  }
  scrollButtonsHide() {
    let scrollRight = this.navCat.scrollWidth - this.navCat.scrollLeft - this.navCat.clientWidth;
    this.buttonLeft.className = this.navCat.scrollLeft < 1 ? "ribbon__arrow ribbon__arrow_left"
      : "ribbon__arrow ribbon__arrow_left ribbon__arrow_visible";
    this.buttonRight.className = scrollRight < 1 ? "ribbon__arrow ribbon__arrow_right"
      : "ribbon__arrow ribbon__arrow_right ribbon__arrow_visible";
  }
}
