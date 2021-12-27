function getMinMax(str) {
  // ваш код...
  let arrStr = str.split(' ').filter(item => !isNaN(+item)).sort((a, b) => a - b);
  return {'min': +arrStr[0], 'max': +arrStr[arrStr.length - 1]};
}
