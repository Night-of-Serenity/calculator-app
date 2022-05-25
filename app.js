const btnNum = Array.from(document.querySelectorAll(".btn-num"));
const btnOperators = Array.from(document.querySelectorAll(".btn-operator"));
const btnEqual = document.querySelector(".btn-equal");
const operationDisplay = document.querySelector(".display-operation");
const resultDisplay = document.querySelector(".display-result");
const btnClear = document.querySelector(".btn-clear");
const btnDot = document.querySelector(".btn-dot");
let operator;

// Basics operators functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const operate = (operator, num1, num2) => {
    num1 = Number(num1); // Ensure number type input
    num2 = Number(num2); // Ensure number type input

    // Call operator function, if return value is float number, round it to 2 decimals
    if (operator === "add") {
        return Number.isInteger(add(num1, num2)) ? add(num1, num2) : add(num1, num2).toFixed(2);
    } else if (operator === "subtract") {
        return Number.isInteger(subtract(num1, num2)) ? subtract(num1, num2) : subtract(num1, num2).toFixed(2);
    } else if (operator === "multiply") {
        return Number.isInteger(multiply(num1, num2)) ? multiply(num1, num2) : multiply(num1, num2).toFixed(2);
    } else if (operator === "divide") {
        return Number.isInteger(divide(num1, num2)) ? divide(num1, num2) : divide(num1, num2).toFixed(2);
    } else {
        return "Error";
    }
};

btnNum.forEach(num => {
    num.addEventListener('click', putNumber);
})

btnOperators.forEach(operator => {
    operator.addEventListener('click', callOperator)
})

btnEqual.addEventListener('click', () => {
    let [num1,symbol,num2] = parseDisplay();
    if (num1 && symbol && num2) {
        console.log([num1,symbol,num2]);
        operationDisplay.textContent = `${num1} ${symbol} ${num2} =`
        resultDisplay.textContent = operate(operator,num1,num2);
    } else return;
} );

btnClear.addEventListener('click', () => {
    operationDisplay.textContent = ''; // Reset operation display
    resultDisplay.textContent = '0';  // Reset result display
    operator = ''; // Reset operator argument;
})

btnDot.addEventListener('click', (event) => {
    if (!operationDisplay.textContent.includes(".")) {
        operationDisplay.textContent += event.target.textContent;
    }
})

function putNumber(event) {
    // let [num1,symbol,num2] = parseDisplay();
    // console.log(typeof num2);
    // First input number will not start with zero
    // if (!num1 && (event.target.getAttribute("data-number") === '0')) return;
    // if (num1 && symbol && num2 === '0' && event.target.getAttribute("data-number") === '0') return;
    operationDisplay.textContent += event.target.getAttribute("data-number");
}

function callOperator(event) {
    let [num1,symbol,num2] = parseDisplay();

    if (!num1) return; // Case 1: click operator button without any number input display
    if (num1 && !symbol && !num2) { // Case 2: click operator button with one number input display
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent += ` ${symbol} `; 
    } else if (num1 && symbol && !num2) { // Case 3: click operator button with one number input but without second number input display
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent = `${num1} ${symbol} `; // Change operator symbol
    } else if (num1 && symbol && num2) { // Case 4: click operator button with two number inputs display
        num1 = operate(operator,num1,num2);
        resultDisplay.textContent = num1;
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent = `${num1} ${symbol} `;
    }
}

function parseDisplay() {
    // Parse operationDisplay string into array and store in variables
    let [num1,symbol,num2] = operationDisplay.textContent.split(" "); 

    console.log([num1,symbol,num2]);
    console.log(operator);

    return [num1,symbol,num2];
}



