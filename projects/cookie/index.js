/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let filter = '';

function getCookies() {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}

function redrawTable() {
  const fragment = document.createDocumentFragment();
  const cookies = getCookies();

  listTable.innerHTML = '';

  if (cookies) {
    for (const cookieName in cookies) {
      const ifNameMatches = cookieName.toLowerCase().includes(filter.toLowerCase()),
        ifValueMatches = cookies[cookieName].toLowerCase().includes(filter.toLowerCase());

      if (filter && !ifNameMatches && !ifValueMatches) continue;

      const cookieTR = document.createElement('tr'),
        cookieNameTD = document.createElement('td'),
        cookieValueTD = document.createElement('td'),
        removeTD = document.createElement('td'),
        removeBtn = document.createElement('button');

      removeBtn.textContent = 'Удалить';
      removeBtn.classList.add('remove-btn');
      removeBtn.dataset.cookie = cookieName;

      cookieNameTD.textContent = cookieName;

      cookieValueTD.textContent = cookies[cookieName];
      cookieValueTD.classList.add('value');

      removeTD.append(removeBtn);
      cookieTR.append(cookieNameTD, cookieValueTD, removeTD);
      fragment.append(cookieTR);
    }

    listTable.append(fragment);
  }
}

redrawTable();

filterNameInput.addEventListener('input', function (e) {
  filter = e.target.value;
  // каждый раз при вводе в инпут нужно перерисовывать таблицу
  redrawTable();
});

addButton.addEventListener('click', () => {
  const name = encodeURIComponent(addNameInput.value.trim()),
    value = encodeURIComponent(addValueInput.value.trim());

  if (!name) {
    alert('Не задано имя для cookie!');
    return;
  } else if (!value) {
    alert('Не задано значение для cookie!');
    return;
  }

  addNameInput.value = '';
  addValueInput.value = '';

  document.cookie = `${name}=${value}`;
  redrawTable();
});

listTable.addEventListener('click', (e) => {
  const cookieName = e.target.dataset.cookie;

  if (e.target.classList.contains('remove-btn')) {
    // удаляем cookie из браузера
    document.cookie = `${cookieName}=deleted; max-age=0`;
    // перерисовка таблицы
    redrawTable();
  }
});
