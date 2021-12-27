function camelize(str) {
  // ваш код...
  let result = '';
  let spltedStr = str.split('-');
  for (let i = 0; i < spltedStr.length; i++) {
    result += i ? spltedStr[i].slice(0, 1).toUpperCase() + spltedStr[i].slice(1) : spltedStr[i];
  }
  return result;
}
