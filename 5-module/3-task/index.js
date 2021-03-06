function initCarousel() {
  // ваш код...
  let buttonLeft = document.querySelector('.carousel__arrow_left');
  let buttonRight = document.querySelector('.carousel__arrow_right');
  buttonLeft.addEventListener('click', moveLeft);
  buttonRight.addEventListener('click', moveRight);
  let carousel = document.querySelector('.carousel__inner');
  let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let posSlide = 0;
  let slideCounter = 1;
  let slideTotal = document.querySelectorAll('.carousel__slide').length;
  buttonLeft.style.display = 'none';
  function moveRight() {
    posSlide -= slideWidth;
    slideCounter++;
    if (buttonLeft.style.display) {
      buttonLeft.style.display = '';
    }
    carousel.style.transform = 'translateX(' + posSlide + 'px)';
    buttonRight.style.display = slideCounter < slideTotal ? '' : 'none';
  }
  function moveLeft() {
    posSlide += slideWidth;
    slideCounter--;
    if (buttonRight.style.display) {
      buttonRight.style.display = '';
    }
    carousel.style.transform = 'translateX(' + posSlide + 'px)';
    buttonLeft.style.display = slideCounter > 1 ? '' : 'none';
  }
}
