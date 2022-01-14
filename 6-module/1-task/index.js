/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.renderThead();
    this._renderTable(rows);
    this.elem.addEventListener('click', () => {this._delRow(event);});
  }

  renderThead() {
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    this.elem.append(thead);
    thead.append(tr);
    let headTextArr = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
    for (let key of headTextArr) {
      let th = document.createElement('th');
      tr.append(th);
      th.append(key);
    }
  }

  _renderTable(rows) {
    let tbody = document.createElement('tbody');
    this.elem.append(tbody);
    for (let row of rows) {
      let tr = document.createElement('tr');
      tbody.append(tr);
      for (let rowEl in row) {
        let td = document.createElement('td');
        tr.append(td);
        td.append(row[rowEl]);
      }
      let td = document.createElement('td');
      tr.append(td);
      let button = document.createElement('button');
      td.append(button);
      button.append('X');
    }

  }

  _delRow(event) {
    //console.log(event.target);
    if (event.target.textContent !== 'X') {return;}
    event.target.closest('tr').remove();
  }
}
