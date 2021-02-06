import React, { useState } from 'react';
import { toast } from 'react-toastify';

import CalcPresentation from './CalcPresentation';

const Calculator = () => {
  const [inputVal, updateInputVal] = useState(0);
  const [calcStack, updateCalcStack] = useState([]);
  const [isOperatorClicked, updateIsOperatorClicked] = useState(false);
  const [isDarkMode, updateIsDarkMode] = useState(false);
  const [isAdvancedOptionVisible, updateIsAdvancedOptionVisible] = useState(false);
  const [isReplaceInput, updateIsReplaceInput] = useState(false);

  const digit = (val) => {
    if (isOperatorClicked || isReplaceInput) {
      updateInputVal(val);
    } else {
      if ((val === 0 && inputVal === 0) || (inputVal > 1000000000)) {
        return;
      }
      const updatedInputVal = inputVal < 0 ? inputVal * 10 - val : inputVal * 10 + val;
      updateInputVal(updatedInputVal);
    }
    updateIsReplaceInput(false);
    updateIsOperatorClicked(false);
  }

  const operator = (op) => {
    if (inputVal === 0 && calcStack.length && calcStack[1] === "/") {
      showErrorToast("Cannot divide by 0");
      updateCalcStack([]);
      return;
    }
    const stack = calcStack;
    if (stack.length === 2) {
      const updatedInputVal = calculate(calcStack[0], inputVal, calcStack[1]);
      updateInputVal(updatedInputVal);
      if (op === "=") {
        updateCalcStack([]);
      } else {
        const updatedStack = [];
        updatedStack.push(updatedInputVal);
        updatedStack.push(op);
        updateCalcStack(updatedStack);
      }
    } else {
      stack.push(inputVal);
      stack.push(op);
      updateCalcStack(stack);
    }
    updateIsOperatorClicked(true);
  }

  const calculate = (num1, num2, operator) => {
    switch (operator) {
      case '+':
        return (num1 + num2);
      case '-':
        return (num1 - num2);
      case '*':
        return (num1 * num2);
      case '/':
        return parseFloat((num1 / num2).toFixed(2));
      default:
        return inputVal;
    }
  }

  const clear = () => {
    updateCalcStack([]);
    updateInputVal(0);
  }

  const showAdvancedButtons = () => {
    updateIsAdvancedOptionVisible(!isAdvancedOptionVisible);
  }

  const updateMode = (mode) => {
    updateIsDarkMode(mode);
  }

  const showErrorToast = (msg = "Something went wrong !") => {
    toast.error(msg, {
      autoClose: 3000,
    });
  };

  const calcBtns = [
    [{
      label: '1',
      operation: () => digit(1)
    }, {
      label: '4',
      operation: () => digit(4)
    }, {
      label: '7',
      operation: () => digit(7)
    }, {
      label: 'Clear',
      operation: () => clear()
    }],
    [{
      label: '2',
      operation: () => digit(2)
    }, {
      label: '5',
      operation: () => digit(5)
    }, {
      label: '8',
      operation: () => digit(8)
    }, {
      label: '0',
      operation: () => digit(0)
    }],
    [{
      label: '3',
      operation: () => digit(3)
    }, {
      label: '6',
      operation: () => digit(6)
    }, {
      label: '9',
      operation: () => digit(9)
    }, {
      label: '=',
      operation: () => operator('=')
    }],
    [{
      label: 'Add(+)',
      operation: () => operator('+')
    }, {
      label: 'Subtract(-)',
      operation: () => operator('-')
    }, {
      label: 'Multiply(*)',
      operation: () => operator('*')
    }, {
      label: 'Divide(/)',
      operation: () => operator('/')
    }]
  ];

  const advancedBtns = [{
    label: '+/-',
    operation: () => {
      updateInputVal(inputVal * (-1));
    }
  }, {
    label: 'Square',
    operation: () => {
      updateInputVal(parseFloat(Math.pow(inputVal, 2).toFixed(2)))
      updateIsReplaceInput(true);
    }
  }, {
    label: 'Square Root',
    operation: () => {
      if (inputVal >= 0) {
        updateInputVal(parseFloat(Math.pow(inputVal, 0.5).toFixed(2)))
        updateIsReplaceInput(true);
      } else {
        showErrorToast("No negative Square Root allowed");
      }
    }
  }];

  return (
    <CalcPresentation
      inputVal={inputVal}
      isDarkMode={isDarkMode}
      isAdvancedOptionVisible={isAdvancedOptionVisible}
      updateMode={updateMode}
      calcBtns={calcBtns}
      advancedBtns={advancedBtns}
      showAdvancedButtons={showAdvancedButtons}
    />
  )
}

export default Calculator;