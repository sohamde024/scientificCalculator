
    document.addEventListener('DOMContentLoaded', function() {
      const display = document.getElementById('display');
      let currentInput = '0';
      let previousInput = '';
      let operation = null;
      let resetInput = false;
      let fullExpression='';
      const PI = Math.PI;
      const E = Math.E;

      // Update the display
      function updateDisplay() {
        display.textContent =fullExpression || currentInput;
      }

      // Handle number input
      function inputNumber(number) {
        if (resetInput) {
          currentInput = number;
          resetInput = false;
          fullExpression += number;
        } else {
          if (currentInput === '0' && number !== '.') {
            currentInput = number;
          } else {
            currentInput += number;
          }
          fullExpression += number;
        }
        updateDisplay();
      }
      // Handle decimal input
      function inputDecimal() {
        if (resetInput) {
          currentInput = '0.';
          resetInput = false;
          fullExpression += '0.';
          updateDisplay();
          return;
        }
        
        if (!currentInput.includes('.')) {
          currentInput += '.';
          fullExpression += '.';
          updateDisplay();
        }
      }

      // Handle operator input
      function inputOperator(op) {
        if (operation !== null && !resetInput) {
          calculate(false);
        }
       // Replace the last operator if one exists
        if (['+', '-', '*', '/', '^', 'mod'].includes(fullExpression.slice(-1))) {
          fullExpression = fullExpression.slice(0, -1) + op;
        } else {
          fullExpression += op;
        }
        
        previousInput = currentInput;
        operation = op;
        resetInput = true;
        updateDisplay();
      }


      // Perform calculation
      function calculate(final=true) {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev)||isNaN(current)) return;
        
        switch (operation) {
          case '+':
            result = prev + current;
            break;
          case '-':
            result = prev - current;
            break;
          case '*':
            result = prev * current;
            break;
          case '/':
            result = prev / current;
            break;
          case '^':
            result = Math.pow(prev, current);
            break;
          case 'mod':
            result = prev % current;
            break;
          default:
            return;
        }
        
        currentInput = result.toString();
        operation = null;
        if (final) {
          fullExpression = currentInput;
        } else {
          fullExpression = currentInput;
          resetInput = true;
        }
        updateDisplay();
      }

      // Clear the calculator
      function clearAll() {
        currentInput = '0';
        previousInput = '';
        fullExpression= '';
        operation = null;
        updateDisplay();
      }

      // Delete last character
      function deleteLastChar() {
        if (fullExpression.length > 0) {
          fullExpression = fullExpression.slice(0, -1);
          
          if (fullExpression.length === 0) {
            currentInput = '0';
          } else {
            // Find the last number in the expression
            const lastNumberMatch = fullExpression.match(/(\d+\.?\d*)$/);
            currentInput = lastNumberMatch ? lastNumberMatch[0] : '0';
          }
        } else {
          currentInput = '0';
        }
        
        updateDisplay();
      }

      // Handle scientific functions
      function scientificFunction(func =true) {
        const value = parseFloat(currentInput);
        let result;
        
        switch (func) {
          case 'sin':
            result = Math.sin(value);
            break;
          case 'cos':
            result = Math.cos(value);
            break;
          case 'tan':
            result = Math.tan(value);
            break;
          case 'asin':
            result = Math.asin(value);
            break;
          case 'acos':
            result = Math.acos(value);
            break;
          case 'atan':
            result = Math.atan(value);
            break;
          case 'log':
            result = Math.log(value);
            break;
          case 'ln':
            result = Math.log10(value);
            break;
          case 'root':
            result = Math.sqrt(value);
            break;
          case 'fact':
            result = factorial(value);
            break;
          case 'pi':
            result = PI;
            break;
          case 'e':
            result = E;
            break;
          case 'exp':
            result = Math.exp(value);
            break;
          case 'percent':
            result = value / 100;
            break;
          default:
            return;
        }
        
        currentInput = result.toString();
        fullExpression = currentInput;
        updateDisplay();
        resetInput = true;
      }

      // Calculate factorial
      function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      }

      // Add event listeners for number buttons
      document.getElementById('zero').addEventListener('click', () => inputNumber('0'));
      document.getElementById('one').addEventListener('click', () => inputNumber('1'));
      document.getElementById('two').addEventListener('click', () => inputNumber('2'));
      document.getElementById('three').addEventListener('click', () => inputNumber('3'));
      document.getElementById('four').addEventListener('click', () => inputNumber('4'));
      document.getElementById('five').addEventListener('click', () => inputNumber('5'));
      document.getElementById('six').addEventListener('click', () => inputNumber('6'));
      document.getElementById('seven').addEventListener('click', () => inputNumber('7'));
      document.getElementById('eight').addEventListener('click', () => inputNumber('8'));
      document.getElementById('nine').addEventListener('click', () => inputNumber('9'));

      // Add event listeners for operator buttons
      document.getElementById('add').addEventListener('click', () => inputOperator('+'));
      document.getElementById('subtract').addEventListener('click', () => inputOperator('-'));
      document.getElementById('multiply').addEventListener('click', () => inputOperator('*'));
      document.getElementById('divide').addEventListener('click', () => inputOperator('/'));
      document.getElementById('power').addEventListener('click', () => inputOperator('^'));
      document.getElementById('mod').addEventListener('click', () => inputOperator('mod'));

      // Add event listener for decimal button
      document.getElementById('decimal').addEventListener('click', inputDecimal);

      // Add event listener for equals button
      document.getElementById('equals').addEventListener('click', calculate);

      // Add event listeners for clear and delete buttons
      document.getElementById('clear').addEventListener('click', clearAll);
      document.getElementById('delete').addEventListener('click', deleteLastChar);

      // Add event listeners for parentheses
      document.getElementById('openParen').addEventListener('click', () => inputNumber('('));
      document.getElementById('closeParen').addEventListener('click', () => inputNumber(')'));

      // Add event listeners for scientific functions
      document.getElementById('sin').addEventListener('click', () => scientificFunction('sin'));
      document.getElementById('cos').addEventListener('click', () => scientificFunction('cos'));
      document.getElementById('tan').addEventListener('click', () => scientificFunction('tan'));
      document.getElementById('asin').addEventListener('click', () => scientificFunction('asin'));
      document.getElementById('acos').addEventListener('click', () => scientificFunction('acos'));
      document.getElementById('atan').addEventListener('click', () => scientificFunction('atan'));
      document.getElementById('log').addEventListener('click', () => scientificFunction('log'));
      document.getElementById('ln').addEventListener('click', () => scientificFunction('ln'));
      document.getElementById('root').addEventListener('click', () => scientificFunction('root'));
      document.getElementById('fact').addEventListener('click', () => scientificFunction('fact'));
      document.getElementById('pi').addEventListener('click', () => scientificFunction('pi'));
      document.getElementById('e').addEventListener('click', () => scientificFunction('e'));
      document.getElementById('exp').addEventListener('click', () => scientificFunction('exp'));
      document.getElementById('percent').addEventListener('click', () => scientificFunction('percent'));

      // Keyboard support
      document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (/[0-9]/.test(key)) {
          event.preventDefault();
          inputNumber(key);
        } else if (key === '.') {
          event.preventDefault();
          inputDecimal();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
          event.preventDefault();
          inputOperator(key);
        } else if (key === 'Enter' || key === '=') {
          event.preventDefault();
          calculate();
        } else if (key === 'Backspace') {
          event.preventDefault();
          deleteLastChar();
        } else if (key === 'Escape') {
          event.preventDefault();
          clearAll();
        } else if (key === '(' || key === ')') {
          event.preventDefault();
          inputNumber(key);
        } else if (key === '^') {
          event.preventDefault();
          inputOperator('^');
        } else if (key === '%') {
          event.preventDefault();
          scientificFunction('percent');
        }
      });
    });
