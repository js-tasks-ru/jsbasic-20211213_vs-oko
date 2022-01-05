function toggleText() {
  // ваш код...
  let button = document.querySelector('.toggle-text-button');
  let textId = document.getElementById('text');
  button.addEventListener('click', reNewEl);
  function reNewEl() {
    return textId.hidden ? textId.hidden = false : textId.hidden = true;
  }
}
