var view = {};
var model = {};
var handlers = {};
var inputScreen = document.getElementById('screen');

model.equation = {
  solved: false,
  left: 0,
  right: 0,
  operand: ''
};

model.add = function (a, b) {
  var result = parseFloat(a, 10) + parseFloat(b, 10);
  return result;
};

model.subtract = function (a, b) {
  var result = parseFloat(a, 10) - parseFloat(b, 10);
  return result;
};

model.multiply = function (a, b) {
  var result = parseFloat(a, 10) * parseFloat(b, 10);
  return result;
};

model.divide = function (a, b) {
  var result = parseFloat(a, 10) / parseFloat(b, 10);
  return result;
};

model.factorial = function (n) {
  if (n === 0) {
    return 1;
  }
  return n * model.factorial(n - 1);
};

handlers.keyHandle = function (elmCont) {
  if (/\s+0/.test(inputScreen.innerHTML) || /0/.test(inputScreen.innerHTML)) {
    inputScreen.innerHTML = '';
  }
  if (model.equation.operand !== '') {
    model.equation.right += elmCont;
  } else {
    model.equation.left += elmCont;
  }
  inputScreen.innerHTML += elmCont;
};

handlers.operandHandle = function (elmCont) {
  model.equation.operand = '';
  if (elmCont === '!') {
    inputScreen.innerHTML = '!' + inputScreen.innerHTML;
  } else {
    inputScreen.innerHTML += ' ' + elmCont + ' ';
  }
  model.equation.operand += elmCont;
};

handlers.clearScreen = function () {
  inputScreen.innerHTML = 0;
  model.equation.left = 0;
  model.equation.right = 0;
  model.equation.operand = '';
  model.equation.solved = false;
};

handlers.solveEqu = function () {
  var result;
  if (model.equation.operand === '+') {
    result = model.add(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '-') {
    result = model.subtract(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '*') {
    result = model.multiply(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '/') {
    result = model.divide(model.equation.left, model.equation.right);
  } else if (model.equation.operand === '!') {
    result = model.factorial(model.equation.left);
  } else if (model.equation.left !== '') {
    result = model.equation.left;
  } else {
    result = 0;
  }
  inputScreen.innerHTML = result;
  model.equation.solved = true;
};

view.setUpEvents = function () {
  var keypad = document.getElementById('keypad');
  keypad.addEventListener('click', function (event) {
    var clickedElm = event.target;
    var operands = ['add', 'sbtrct', 'mltply', 'divide', 'fctoril'];
    if (model.equation.solved && operands.indexOf(clickedElm.id) !== -1) {
      model.equation.left = inputScreen.innerHTML;
      model.equation.right = 0;
      model.equation.solved = false;
      handlers.operandHandle(clickedElm.innerHTML);
    } else if (model.equation.solved) {
      handlers.clearScreen();
    } else if (operands.indexOf(clickedElm.id) !== -1) {
      handlers.operandHandle(clickedElm.innerHTML);
    }
    if (/\d/.test(parseInt(clickedElm.innerHTML, 10)) || clickedElm.id === 'dot') {
      handlers.keyHandle(clickedElm.innerHTML);
    } else if (clickedElm.id === 'clear') {
      handlers.clearScreen();
    } else if (clickedElm.id === 'equal') {
      handlers.solveEqu();
    }
  });
};

view.setUpEvents();
