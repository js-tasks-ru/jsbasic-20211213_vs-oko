function showSalary(users, age) {
  // ваш код...
  return users.filter(item => item.age <= age).map(el => el.name + ', ' + el.balance).join('\n');
}
