/* eslint-disable curly */
import {useRef, useState} from 'react';

enum Operator {
  add,
  substract,
  multiply,
  divide,
}
export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previusNumber, setPreviousNumber] = useState('0');
  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  };
  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    } else {
      return setNumber('-' + number);
    }
  };
  const deleteOperation = () => {
    let arr = number.split('');
    arr.pop();
    console.log(arr);
    if (arr.length === 0 || (arr[0] === '-' && arr.length === 1))
      return setNumber('0');
    return setNumber(arr.join(''));
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto, y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evitar 000000.00
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };
  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }
    setNumber('0');
  };
  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };
  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(previusNumber);
    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        break;
      case Operator.substract:
        setNumber(`${num2 + num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;

      default:
        throw new Error('Operation not implemented');
    }
    setPreviousNumber('0');
  };
  return {
    // Properties
    number,
    previusNumber,
    // Methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult,
  };
};
