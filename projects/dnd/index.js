/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let currentDraggableDiv,
  xIndent = 0,
  yIndent = 0;

document.addEventListener('mousemove', (e) => {
  if (currentDraggableDiv) {
    currentDraggableDiv.style.top = e.clientY - yIndent + 'px';
    currentDraggableDiv.style.left = e.clientX - xIndent + 'px';
  }
});

function randomSize(minSize, maxSize) {
  const size = {},
    width = Math.round(minSize + Math.random() * (maxSize - minSize)),
    height = Math.round(minSize + Math.random() * (maxSize - minSize));
  size.width = width;
  size.height = height;

  return size;
}

function randomColor() {
  const r = Math.round(Math.random() * 255),
    g = Math.round(Math.random() * 255),
    b = Math.round(Math.random() * 255),
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

  return color;
}

function randomPosition() {
  const position = {},
    coordX = Math.round(Math.random() * window.innerWidth),
    coordY = Math.round(Math.random() * window.innerHeight);
  position.coordX = coordX;
  position.coordY = coordY;

  return position;
}

export function createDiv() {
  const minSize = 20,
    maxSize = 200,
    newDiv = document.createElement('div');

  newDiv.classList.add('draggable-div');

  newDiv.style.background = randomColor();

  const position = randomPosition();
  newDiv.style.left = position.coordX + 'px';
  newDiv.style.top = position.coordY + 'px';

  const size = randomSize(minSize, maxSize);
  newDiv.style.width = size.width + 'px';
  newDiv.style.height = size.height + 'px';

  newDiv.addEventListener('mousedown', (e) => {
    currentDraggableDiv = newDiv;
    // координаты относительно этого узла
    xIndent = e.offsetX;
    yIndent = e.offsetY;
  });

  newDiv.addEventListener('mouseup', () => (currentDraggableDiv = false));

  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function (e) {
  e.preventDefault();
  const div = createDiv();
  console.log(div);
  homeworkContainer.appendChild(div);
});
