function makeDiagonalRed(table) {
  // ваш код...
  let strings = table.rows;
  let counter = 0;
  for (let row of strings) {
    row.cells[counter].style.backgroundColor = 'red';
    counter++;
  }
}
