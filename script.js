////////////////////////////////////////
////////// DECLARE VARIABLES //////////
//////////////////////////////////////

const digits        = document.querySelectorAll(".digit");
const operators     = document.querySelectorAll(".operator");

const clearButton   = document.getElementById("clear");
const deleteButton  = document.getElementById("delete");
const equalButton   = document.getElementById("equal")

const logScreen = document.getElementById("displayScreen");
const inputScreen   = document.getElementById("inputScreen");


let log = [];
let storedInput = '';
let storedOperator = undefined;

let firstDigit = undefined;
let secondDigit = undefined;

////////////////////////////////////////
////////// DECLARE FUNCTIONS //////////
//////////////////////////////////////

function updateInputDisplay(){
    inputScreen.innerHTML = storedInput;
}

function updateLogDisplay(){
    logScreen.innerHTML = '';

    log.unshift(storedInput);
    if (log.length == 5){
        log.pop();
    }

    log.forEach((line) =>
    logScreen.innerHTML += `${line} <br>`);
}


function addValue(digit){
    storedInput += digit;
    updateInputDisplay();
    console.log(storedInput);
}


function addOperator(operator){
    if (storedOperator) return;

    storedOperator = operator.id;
    storedInput += operator.innerHTML.replace(' ', '');
    updateInputDisplay();
    console.log(storedOperator);
    
}

function equals(){
    if (!firstDigit || !storedOperator) return;

    updateLogDisplay();
    
}

function calculation(firstDigit, secondDigit=undefined, operator){
    if (operator == 'add'){
        return firstDigit + secondDigit;
    }
    if (operator == 'subtract'){
        return firstDigit - secondDigit;
    }
    if (operator == 'multiply'){
        return firstDigit * secondDigit;
    }
    if (operator == 'divide'){
        return firstDigit / secondDigit;
    }
    if (operator == 'exponent'){
        return firstDigit ** secondDigit;
    }
    if (operator == 'squareRoot'){
        return Math.sqrt(firstDigit);
    }
}

// Clear all variables used for calculation and input display, and require
// that the next input be a number (not an operator)
function clear(){
    storedInput    = '';
    storedOperator  = undefined;
    firstDigit      = undefined;
    secondDigit     = undefined;

    inputScreen.innerHTML = storedInput;
    numberNext = true;
    console.log("Screen cleared");
}

function backspace(){
    if (numberNext){
        storedOperator = undefined;
        numberNext = false;
        return;
    }
    storedInput = storedInput.slice(0, -1);
}

/////////////////////////////////////////////
////////// ATTACH EVENT LISTENERS //////////
///////////////////////////////////////////

digits.forEach((digit) => 
    digit.addEventListener('click', addValue.bind(this, digit.value)));

operators.forEach((operator) =>
    operator.addEventListener('click', addOperator.bind(this, operator)));

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', backspace);
equalButton.addEventListener('click', equals);





