const btnNum = Array.from(document.querySelectorAll(".btn-num"));
const btnOperators = Array.from(document.querySelectorAll(".btn-operator"));
const btnEqual = document.querySelector(".btn-equal");
const operationDisplay = document.querySelector(".display-operation");
const resultDisplay = document.querySelector(".display-result");
const btnClear = document.querySelector(".btn-clear");
const btnDot = document.querySelector(".btn-dot");
const btnDel = document.querySelector(".btn-delete");
let savedOperator;

// Basics operators functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const operate = (operator, num1, num2) => {
    num1 = Number(num1); // Ensure number type input
    num2 = Number(num2); // Ensure number type input

    // Call operator function, if return value is float number, round it to 2 decimals
    if (operator === "+") {
        return Number.isInteger(add(num1, num2)) ? add(num1, num2) : add(num1, num2).toFixed(2);
    } else if (operator === "-") {
        return Number.isInteger(subtract(num1, num2)) ? subtract(num1, num2) : subtract(num1, num2).toFixed(2);
    } else if (operator === "*") {
        return Number.isInteger(multiply(num1, num2)) ? multiply(num1, num2) : multiply(num1, num2).toFixed(2);
    } else if (operator === "/" && num2 === 0){
        operationDisplay.textContent = "";
        return "Error!";
    } else if (operator === "/") {
        return Number.isInteger(divide(num1, num2)) ? divide(num1, num2) : divide(num1, num2).toFixed(2);
    } 
};

btnNum.forEach(num => {
    // Get number from number button's data-number custom attribute
    num.addEventListener('click', event => putNumber(event.target.getAttribute("data-number"))); 
})

btnOperators.forEach(operator => {
    // Get operator from operator button's data-operator custom attribute
    operator.addEventListener('click', event => callOperator(event.target.getAttribute("data-operator"), event.target.textContent));
})

btnEqual.addEventListener('click', getCalculate);
btnClear.addEventListener('click', clearCalculator);
btnDot.addEventListener('click', getDot);
btnDel.addEventListener('click', callDelete)
window.addEventListener('keydown', getKey);

function putNumber(number) {
    if (operationDisplay.textContent.includes("=")) { // Case for put new number after equal operated
        operationDisplay.textContent = number;
    } else 
        operationDisplay.textContent += number; 
}

function callOperator(operator, symbols) {
    let [num1,symbol,num2] = parseDisplay();

    if (!num1) return; // Case 1: click operator button without any number input display
    if (num1 && !symbol && !num2) { // Case 2: click operator button with one number input display
        savedOperator = operator;
        operationDisplay.textContent += ` ${symbols} `; 
    } else if (num1 && symbol && !num2) { // Case 3: click operator button with one number input but without second number input display
        savedOperator = operator;
        operationDisplay.textContent = `${num1} ${symbols} `; // Change operator symbol
    } else if (num1 && symbol && num2) { // Case 4: click operator button with two number inputs display
        num1 = operate(savedOperator,num1,num2);
        resultDisplay.textContent = num1;
        savedOperator = operator;
        // Show operation display in case num1 return no "Error!" 
        if ((num1 === "Error!")) {
            return;
        } else {
            operationDisplay.textContent = `${num1} ${symbols} `;
        }
    }
}

function parseDisplay() {
    // Parse operationDisplay string into array
    return operationDisplay.textContent.split(" "); 
}

function getCalculate() {
    let [num1,symbol,num2] = parseDisplay();
    if (num1 && symbol && num2) {
        operationDisplay.textContent = `${num1} ${symbol} ${num2} =`
        resultDisplay.textContent = operate(savedOperator,num1,num2);
    } else return;
}

function clearCalculator() {
    operationDisplay.textContent = ''; // Reset operation display
    resultDisplay.textContent = '0';  // Reset result display
    savedOperator = ''; // Reset operator argument;
}

function getDot() {
    let [num1, symbol, num2] = parseDisplay();
    if (operationDisplay.textContent.includes("=")) return; // Not allow to put dot after equal operated
    if (num2) {
        if (!num2.includes(".")) {  // Check if "." already exist for second number input
            operationDisplay.textContent += ".";
        }
    }
    else {
        if (!num1.includes(".") || (num1.includes(".") && symbol)) { // Check if "." already exist for first number input
            operationDisplay.textContent += ".";
        }
    }  
}

function callDelete() {
    let [num1, symbol, num2] = parseDisplay();
    if ((num1 && !symbol && !num2) || (num1 && symbol && num2)) { // Delete only number input on display
        operationDisplay.textContent = operationDisplay.textContent.substring(0, operationDisplay.textContent.length - 1);
    } else 
        return;
}

function getKey(event) {
    let key = event.key;
    // Enter number from keyboard 
    for (let i = 0; i < 10; i++) {
        if (key === i.toString()) {
            putNumber(key);    
        }
    }

    // Press "Enter" or "="
    if (key === "Enter" || key === "=") {
        getCalculate();
    }

    // Press <operator>
    switch (key) {
        case "+":
            callOperator(key, key);
            break;
        case "-":
            callOperator(key, key);
            break;
        case "*":
            callOperator(key, "x");
            break;
        case "/":
            callOperator(key, "÷");
            break;
    }

    // Press "Esc"
    if (key === "Escape") {
        clearCalculator();
    }

    // Press "."
    if (key === ".") {
        getDot();
    }

    // Press "Delete" or "Backspace"
    if (key === "Delete" || key === "Backspace") {
        callDelete();
    }
}