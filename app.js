const btnNum = Array.from(document.querySelectorAll(".btn-num"));
const btnOperators = Array.from(document.querySelectorAll(".btn-operator"));
const operationDisplay = document.querySelector(".display-operation");
const resultDisplay = document.querySelector(".display-result");
let operator;

// Basics operators functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const operate = (operator, num1, num2) => {
    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "subtract") {
        return subtract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
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

function putNumber(event) {
    operationDisplay.textContent += event.target.getAttribute("data-number");
}

function callOperator(event) {
    // Parse operationDisplay string into array and store in variables
    let [num1,symbol,num2] = operationDisplay.textContent.split(" "); 

    num1 = Number(num1); 
    num2 = Number(num2);
    console.log([num1,symbol,num2]);
    console.log(operator);
    if (!num1) return;
    if (num1 && !symbol && !num2) { // Case 1: click operator button without any number input display
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent += ` ${symbol} `; 
    } else if (num1 && symbol && !num2) { // Case 2: click operator button with one number input but without second number input display
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent = `${num1} ${symbol} `; 
    } else if (num1 && symbol && num2) { // Case 3: click operator button with two number inputs display
        num1 = operate(operator,num1,num2);
        resultDisplay.textContent = num1;
        symbol = event.target.textContent;
        operator = event.target.getAttribute("data-operator");
        operationDisplay.textContent = `${num1} ${symbol} `;
    }
}





