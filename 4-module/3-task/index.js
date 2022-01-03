function highlight(table) {
  let strings = table.tBodies[0].rows;
  for (let row of strings) {
    let listCells = row.cells;
    for (let cell of listCells) {
      switch (cell.cellIndex) {
      case 3:
        if (cell.dataset.available) {
          if (cell.dataset.available === 'true') {
            row.classList.add("available");
          }
          if (cell.dataset.available === 'false') {
            row.classList.add("unavailable");
          }
        } else {
          // row.setAttribute('hidden', '{ display: none }');
          row.hidden = true;//так выглядит лучше
        }
        break;
      case 2:
        if (cell.textContent === 'm') {
          row.classList.add('male');
        }
        if (cell.textContent === 'f') {
          row.classList.add('female');
        }
        break;
      case 1:
        if (cell.textContent < 18) {
          row.style.textDecoration = 'line-through';
        }
        break;
      }

    }
  }
}

