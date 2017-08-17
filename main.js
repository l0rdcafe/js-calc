var view = {};
var model = {};
var handlers = {};
var helpers = {};
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
  var result;
  if (n === 0) {
    return 1;
  }
  result = parseFloat(n) * this.factorial(parseFloat(n) - 1);

  return result;
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
    result = inputScreen.innerHTML;
  }
  inputScreen.innerHTML = result;
  model.equation.solved = true;
};

helpers.isNumber = function (char) {
  return /\d/.test(parseInt(char, 10));
};

helpers.isOperand = function (id) {
  var operands = ['add', 'sbtrct', 'mltply', 'divide', 'fctoril'];
  return operands.indexOf(id) !== -1;
};

helpers.isFactorial = function () {
  return model.equation.operand === '!';
};

helpers.hasOperand = function () {
  return model.equation.operand !== '';
};

view.setUpEvents = function () {
  var keypad = document.getElementById('keypad');
  keypad.addEventListener('click', function (event) {
    var clickedElm = event.target;
    if (helpers.isOperand(clickedElm.id) && (helpers.hasOperand() || helpers.isFactorial())) {
      handlers.solveEqu();
      model.equation.left = inputScreen.innerHTML;
      model.equation.right = 0;
      model.equation.solved = false;
      handlers.operandHandle(clickedElm.innerHTML);
    } else if (helpers.isOperand(clickedElm.id)) {
      handlers.operandHandle(clickedElm.innerHTML);
    }
    if (helpers.isNumber(clickedElm.innerHTML) || clickedElm.id === 'dot') {
      handlers.keyHandle(clickedElm.innerHTML);
    } else if (clickedElm.id === 'clear') {
      handlers.clearScreen();
    } else if (clickedElm.id === 'equal') {
      handlers.solveEqu();
    }
  });
};

view.setUpEvents();
