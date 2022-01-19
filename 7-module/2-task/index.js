export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal__overlay';
    this.modal.append(this.overlay);
    this.inner = document.createElement('div');
    this.inner.className = 'modal__inner';
    this.modal.append(this.inner);
    this.renderModal();
    this.keyDownFuncLink = () => this.keyDownCheck(event);
  }
  renderModal() {
    this.header = document.createElement('div');
    this.header.className = 'modal__header';
    this.buttonClose = document.createElement('button');
    this.buttonClose.className = 'modal__close';
    this.buttonClose.innerHTML += '<img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />';
    this.titleTag = document.createElement('h3');
    this.titleTag.className = 'modal__title';
    this.body = document.createElement('div');
    this.body.className = 'modal__body';
    this.inner.append(this.header);
    this.inner.append(this.body);
    this.header.append(this.buttonClose);
    this.header.append(this.titleTag);
  }
  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.keyDownFuncLink);
    this.buttonClose.addEventListener('click', () => this.close());
  }
  close() {
    document.body.querySelector('.modal').remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.keyDownFuncLink);

  }
  setTitle(title) {
    this.titleTag.textContent = title;
  }
  setBody(bodyElem) {
    for (let child of this.body.children) {
      child.remove();
    }
    this.body.append(bodyElem);
  }
  keyDownCheck(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
