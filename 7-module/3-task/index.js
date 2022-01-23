export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.sliderThumb = document.createElement('div');
    this.sliderThumb.className = 'slider__thumb';
    this.thumbPos = 0;
    this.sliderProgress = document.createElement('div');
    this.sliderProgress.className = 'slider__progress';
    this.sliderBody = document.createElement('div');
    this.sliderBody.className = 'slider__steps';
    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderBody);
    this.sliderThumb.style.left = "0%";
    this.sliderProgress.style.width = "0%";
    this.thumbPos = 0;
    this.sliderStepsRender();
    this.elem.addEventListener('click', () => this.sliderMove(event));
  }
  sliderStepsRender() {
    this.sliderThumb.innerHTML += '<span class="slider__value">' + this.thumbPos + '</span>';

    for (let i = this.value; i < this.steps; i++) {
      let span = document.createElement('span');
      this.sliderBody.append(span);
    }
    this.sliderClassInner();
  }
  sliderClassInner() {
    this.sliderThumb.firstElementChild.textContent = this.thumbPos;
    let sliderSteps = this.sliderBody.children;
    for (let i = 0; i < sliderSteps.length; i++) {
      if (i === this.thumbPos) {
        sliderSteps[i].className = 'slider__step-active';
      } else {
        sliderSteps[i].className = '';
      }
    }
  }
  sliderCords(cordX) {
    let oneStep = this.elem.offsetWidth / (this.steps - 1);
    let left = this.elem.getBoundingClientRect().left;
    let findStep;
    for (let i = this.value; i < this.steps; i++) {
      let compareStep1 = oneStep * i + left;
      let compareStep2 = oneStep * (i + 1) + left;
      if (cordX >= compareStep1 && cordX <= compareStep2) {
        let cordA = cordX - compareStep1;
        let coedB = compareStep2 - cordX;
        if (cordA !== coedB) {
          findStep = coedB > cordA ? i : i + 1;
        } else {
          findStep = i;
        }
      }
    }
    return findStep;
  }
  sliderMove(event) {
    let findStep = this.sliderCords(event.clientX);
    this.thumbPos = findStep;
    let valuePercents = findStep / (this.steps - 1) * 100;
    this.sliderThumb.style.left = valuePercents + '%';
    this.sliderProgress.style.width = valuePercents + '%';
    this.sliderClassInner();
    this.customEventInit();
  }
  customEventInit() {
    let customEvent = new CustomEvent('slider-change', { bubbles: true, detail: this.thumbPos });
    this.elem.dispatchEvent(customEvent);
  }
}
