function sumSalary(salaries) {
  // ваш код...
  let result = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && !isNaN(salaries[key]) && isFinite(salaries[key])) {
      result += salaries[key];
    }
  }
  return result;
}
