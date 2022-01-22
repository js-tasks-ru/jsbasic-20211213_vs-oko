export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.sliderThumb = document.createElement('div');
    this.sliderThumb.className = 'slider__thumb';
    //this.thumbPos = 0;
    this.sliderProgress = document.createElement('div');
    this.sliderProgress.className = 'slider__progress';
    this.sliderBody = document.createElement('div');
    this.sliderBody.className = 'slider__steps';
    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderBody);
    this.sliderThumb.style.left = this.value + "%";
    this.sliderProgress.style.width = this.value + "%";
    this.sliderStepsRender();
    this.sliderThumb.addEventListener('pointerdown', () => this.sliderDragDropInit(event));
  }
  sliderStepsRender() {
    this.sliderThumb.innerHTML += '<span class="slider__value">' + this.value + '</span>';

    for (let i = this.value; i < this.steps; i++) {
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

    /*    let oneStep = this.elem.offsetWidth / (this.steps - 1);
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
    return findStep;*/
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
  sliderDragDropInit (cordX) {
    this.SliderMoveLink = () => this.sliderMove(event);
    document.addEventListener('pointermove', this.SliderMoveLink);
    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.style['touch-action'] = 'none';
    document.addEventListener('pointerup', this.SliderMoveLink);

  }
  sliderMove(event) {
    //console.log( event.type);
    let valuePercents;
    if (event.type === 'pointermove') {
      this.elem.classList.add('slider_dragging');
/*      let valuePercents = Math.round((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth * 100);
      valuePercents = valuePercents > 100 ? 100 : valuePercents;
      valuePercents = valuePercents < 0 ? 0 : valuePercents;
      //console.log(valuePercents);*/
      let valuePos = this.sliderCords(event);
      let segments = this.steps - 1;
      let approximateValue = valuePos * segments;
      valuePercents = valuePos * 100;
/*      this.sliderThumb.style.left = valuePos * 100 + '%';
      this.sliderProgress.style.width = valuePos * 100 + '%';*/
      this.value = Math.round(approximateValue);
    }
    if (event.type === 'pointerup') {
      //console.log( event.type);
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', this.SliderMoveLink);
      let valuePos = this.sliderCords(event);
      let segments = this.steps - 1;
      let approximateValue = valuePos * segments;
      this.value = Math.round(approximateValue);
/*
      valuePercents = valuePercents > 100 ? 100 : valuePercents;
      valuePercents = valuePercents < 0 ? 0 : valuePercents;
*/
      valuePercents = this.value / segments * 100;
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
