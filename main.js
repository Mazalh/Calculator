const resultInput = document.getElementById('result');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldResetScreen = false;

// Оновлення дисплея
function updateDisplay() {
  resultInput.value = currentInput;
}

// Очищення калькулятора
function clearCalculator() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  updateDisplay();
}

// Обробка натискання числа
function appendNumber(number) {
  if (currentInput === '0' || shouldResetScreen) {
    currentInput = number;
    shouldResetScreen = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Додавання крапки
function appendDot() {
  if (shouldResetScreen) {
    currentInput = '0';
    shouldResetScreen = false;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

// Вибір оператора
function chooseOperator(selectedOperator) {
  if (operator !== null) evaluate();
  previousInput = currentInput;
  operator = selectedOperator;
  shouldResetScreen = true;
}

// Обчислення результату
function evaluate() {
  if (operator === null || shouldResetScreen) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = null;
  updateDisplay();
}

// Обробка кліків по кнопках
buttons.addEventListener('click', (event) => {
  const target = event.target;

  if (!target.matches('button')) return;

  const value = target.textContent;

  if (!isNaN(value)) {
    appendNumber(value);
  } else if (value === '.') {
    appendDot();
  } else if (value === 'C') {
    clearCalculator();
  } else if (value === '=') {
    evaluate();
  } else if (['+', '-', '×', '÷'].includes(value)) {
    chooseOperator(value);
  }
});

// Ініціалізація
updateDisplay();
