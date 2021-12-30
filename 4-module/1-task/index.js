function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement('ul');
  document.body.append(ul);
  let friendsList = friends.map(item => item.firstName + ' ' + item.lastName);
  for (let el of friendsList) {
    let li = document.createElement('li');
    li.textContent = el;
    ul.append(li);
  }
  return ul;
}
