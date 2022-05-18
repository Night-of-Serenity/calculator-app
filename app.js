const btnNum = Array.from(document.querySelectorAll(".btn-num"));
const operationDisplay = document.querySelector(".display-operation");
const currentDisplay = document.querySelector(".display-current");
let displayNumber = 0;

// Basics operators functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const operate = (operator, num1, num2) => operator(num1, num2);

btnNum.forEach(num => {
    num.addEventListener('click', updateCurrentnumber);
})

function updateCurrentnumber(event) {
    if (currentDisplay.textContent === "0") {
        displayNumber = event.target.getAttribute("data-number");
        currentDisplay.textContent = displayNumber;
    }
    else {
        displayNumber += event.target.getAttribute("data-number");
        currentDisplay.textContent = displayNumber;
    }
}





