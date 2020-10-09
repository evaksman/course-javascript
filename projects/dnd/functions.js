/* ДЗ 6 - DOM Events */

/*
 Задание 1:

 Функция должна добавлять обработчик fn события eventName к элементу target

 Пример:
   addListener('click', document.querySelector('a'), () => console.log('...')) // должна добавить указанный обработчик кликов на указанный элемент
 */
const addListener = (eventName, target, fn) => target.addEventListener(eventName, fn);

/*
 Задание 2:

 Функция должна удалять у элемента target обработчик fn события eventName

 Пример:
   removeListener('click', document.querySelector('a'), someHandler) // должна удалить указанный обработчик кликов на указанный элемент
 */
const removeListener = (eventName, target, fn) =>
  target.removeEventListener(eventName, fn);

/*
 Задание 3:

 Функция должна добавить к элементу target такой обработчик на события eventName, чтобы он отменял действия по умолчанию

 Пример:
   skipDefault('click', document.querySelector('a')) // после вызова функции, клики на указанную ссылку не должны приводить к переходу на другую страницу
 */
const skipDefault = (eventName, target) =>
  target.addEventListener(eventName, (e) => e.preventDefault());

/*
 Задание 4:

 Функция должна эмулировать событие click для элемента target

 Пример:
   emulateClick(document.querySelector('a')) // для указанного элемента должно быть симулировано события click
 */
// const emulateClick = (target) => target.click();
const emulateClick = (target) => target.dispatchEvent(new MouseEvent('click'));

/*
 Задание 6:

 Функция должна добавить такой обработчик кликов к элементу target,
 который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target

 Пример:
   delegate(document.body, () => console.log('кликнули на button')) // добавит такой обработчик кликов для body, который будет вызывать указанную функцию только если кликнули на кнопку (элемент с тегом button)
 */
const delegate = (target, fn) => {
  const buttons = target.getElementsByTagName('button');
  for (const button of buttons) {
    button.addEventListener('click', fn);
  }

  // вариант Сергея Мелюкова
  // target.addEventListener('click', (e) => {
  //   if (e.target.tagName === 'BUTTON') fn();
  // });
};

/*
 Задание 7:

 Функция должна добавить такой обработчик кликов к элементу target,
 который сработает только один раз и удалится (перестанет срабатывать для последующих кликов по указанному элементу)

 Пример:
   once(document.querySelector('button'), () => console.log('обработчик выполнился!')) // добавит такой обработчик кликов для указанного элемента, который вызовется только один раз и затем удалится
 */
const once = (target, fn) => target.addEventListener('click', fn, { once: true });

export { addListener, removeListener, skipDefault, emulateClick, delegate, once };
