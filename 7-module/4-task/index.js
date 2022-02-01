export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.sliderThumb = document.createElement('div');
    this.sliderThumb.className = 'slider__thumb';
    this.sliderProgress = document.createElement('div');
    this.sliderProgress.className = 'slider__progress';
    this.sliderBody = document.createElement('div');
    this.sliderBody.className = 'slider__steps';
    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderBody);
    this.sliderThumb.style.left = this.value / (this.steps - 1) * 100 + "%";
    this.sliderProgress.style.width = this.value / (this.steps - 1) * 100 + "%";
    this.sliderStepsRender();
    this.elem.addEventListener('click', () => this.sliderMove(event));
    this.sliderThumb.addEventListener('pointerdown', () => this.sliderDragDropInit(event));
  }
  sliderStepsRender() {
    this.sliderThumb.innerHTML += '<span class="slider__value">' + this.value + '</span>';

    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      this.sliderBody.append(span);
    }
    this.sliderClassInner();
  }
  sliderClassInner() {
    this.sliderThumb.firstElementChild.textContent = this.value;
    let sliderSteps = this.sliderBody.children;
    for (let i = 0; i < sliderSteps.length; i++) {
      if (i === this.value) {
        sliderSteps[i].className = 'slider__step-active';
      } else {
        sliderSteps[i].className = '';
      }
    }
  }
  sliderCords(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    return leftRelative;
  }
  sliderDragDropInit () {
    this.SliderMoveLink = () => this.sliderMove(event);
    document.addEventListener('pointermove', this.SliderMoveLink);
    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.style['touch-action'] = 'none';
    document.addEventListener('pointerup', this.SliderMoveLink);

  }
  sliderMove(event) {
    let valuePercents;
    let approximateValue;
    let valuePos;
    let segments = this.steps - 1;
    valuePos = this.sliderCords(event);
    approximateValue = valuePos * segments;
    this.value = Math.round(approximateValue);
    switch (event.type) {
    case 'click':
      valuePos = this.sliderCords(event);
      valuePercents = this.value / segments * 100;
      break;
    case 'pointermove':
      this.elem.classList.add('slider_dragging');
      valuePercents = valuePos * 100;
      break;
    case 'pointerup':
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', this.SliderMoveLink);
      document.removeEventListener('pointerup', this.SliderMoveLink);
      valuePercents = this.value / segments * 100;
      break;
    }
    this.sliderThumb.style.left = valuePercents + '%';
    this.sliderProgress.style.width = valuePercents + '%';
    this.sliderClassInner();
    this.customEventInit();
  }
  customEventInit() {
    let customEvent = new CustomEvent('slider-change', { bubbles: true, detail: this.value });
    this.elem.dispatchEvent(customEvent);
  }
}
