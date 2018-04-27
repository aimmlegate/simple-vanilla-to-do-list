var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var inputForm = document.querySelector('#input-form');
var inputContent = document.querySelector('#input-content');
var clearAll = document.querySelector('#clear-all');
var saveJSON = document.querySelector('#save-json');

var toStorage = function toStorage(data) {
  localStorage.setItem('myTodoList', JSON.stringify(data));
};

var getFromStorage = function getFromStorage() {
  return JSON.parse(localStorage.getItem('myTodoList'));
};

var clearStorage = function clearStorage() {
  localStorage.clear('myTodoList');
};

var todoData = getFromStorage() || [];

var renderElement = function renderElement(element) {
  var elementTemplate = '\n    <div class="notification" data-id=\'' + element.id + '\'>\n      <button class="delete"></button>\n      ' + element.text + ' \n    </div> \n  ';
  var newElement = document.createElement('div');
  newElement.classList.add("todo-item");
  newElement.innerHTML = elementTemplate;
  inputContent.appendChild(newElement);
};

var renderAll = function renderAll(data) {
  data.forEach(function (el) {
    return renderElement(el);
  });
};

var removeElement = function removeElement(id) {
  var removedEl = document.querySelector('[data-id=\'' + id + '\']').parentElement;
  inputContent.removeChild(removedEl);
};

var addHandler = function addHandler(e) {
  var target = e.target;
  var formData = _.fromPairs([].concat(_toConsumableArray(new FormData(target))));
  var newItem = _extends({ id: Date.now() }, formData);
  todoData = [].concat(_toConsumableArray(todoData), [newItem]);
  toStorage(todoData);
  renderElement(newItem);
  target.querySelector('.control .input').value = '';
  e.preventDefault();
};

var clearHandler = function clearHandler(e) {
  var allElementsId = todoData.map(function (el) {
    return el.id;
  });
  allElementsId.forEach(function (el) {
    return removeElement(el);
  });
  todoData = [];
  clearStorage();
  e.preventDefault();
};

var removeHandler = function removeHandler(e) {
  var target = e.target.parentElement;
  var elementId = target.dataset.id;
  todoData = todoData.filter(function (el) {
    return !(el.id == elementId);
  });
  toStorage(todoData);
  removeElement(elementId);
  e.preventDefault();
};

var saveHandler = function saveHandler(e) {
  e.preventDefault();
  var json = JSON.stringify(todoData);
  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  document.location = url;
};

inputForm.addEventListener('submit', addHandler);
inputContent.addEventListener('click', removeHandler);
clearAll.addEventListener('click', clearHandler);
saveJSON.addEventListener('click', saveHandler);

renderAll(todoData);