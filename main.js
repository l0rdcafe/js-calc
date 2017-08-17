var view = {};
var model = {};
var handlers = {};
var inputScreen = document.getElementById('screen');

model.equation = {
  solved: false,
  left: '',
  right: '',
  operand: ''
};

model.add = function (a, b) {
  var result = parseFloat(a, 10) + parseFloat(b, 10);
  inputScreen.innerHTML = result;
};

model.subtract = function (a, b) {
  var result = parseFloat(a, 10) - parseFloat(b, 10);
  inputScreen.innerHTML = result;
};

model.multiply = function (a, b) {
  var result = parseFloat(a, 10) * parseFloat(b, 10);
  inputScreen.innerHTML = result;
};

model.divide = function (a, b) {
  var result = parseFloat(a, 10) / parseFloat(b, 10);
  inputScreen.innerHTML = result;
};

model.factorial = function (n) {
  if (n === 0) {
    return 1;
  }
  return n * model.factorial(n);
};

handlers.keyHandle = function (elmCont) {
  if (/\s+0/.test(inputScreen.innerHTML) || /0/.test(inputScreen.innerHTML)) {
    inputScreen.innerHTML = '';
  }
  if (model.equation.operand !== '') {
    model.equation.right += elmCont;
    inputScreen.innerHTML += elmCont;
  } else {
    model.equation.left += elmCont;
    inputScreen.innerHTML += elmCont;
  }
};

handlers.operandHandle = function (elmCont) {
  inputScreen.innerHTML += ' ' + elmCont + ' ';
  model.equation.operand += elmCont;
};

handlers.clearScreen = function () {
  inputScreen.innerHTML = 0;
  model.equation.left = '';
  model.equation.right = '';
  model.equation.operand = '';
  model.equation.solved = false;
};

handlers.solveEqu = function () {
  if (model.equation.operand === '+') {
    model.add(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '-') {
    model.subtract(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '*') {
    model.multiply(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '/') {
    model.divide(model.equation.operand, model.equation.right);
  }
  model.equation.solved = true;
};

view.setUpEvents = function () {
  var keypad = document.getElementById('keypad');
  keypad.addEventListener('click', function (event) {
    var clickedElm = event.target;
    if (model.equation.solved) {
      handlers.clearScreen();
    }
    if (/\d/.test(parseInt(clickedElm.innerHTML, 10)) || clickedElm.id === 'dot') {
      handlers.keyHandle(clickedElm.innerHTML);
    } else if (clickedElm.id === 'clear') {
      handlers.clearScreen();
    } else if (clickedElm.id === 'equal') {
      handlers.solveEqu();
    } else if (clickedElm.id === 'add' || 'sbtrct' || 'mltply' || 'divide') {
      handlers.operandHandle(clickedElm.innerHTML);
    }
  });
};

view.setUpEvents();
