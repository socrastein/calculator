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


let storedLog = [];
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

function updateLogDisplay(answer){
    logScreen.innerHTML = '';

    storedLog.push(storedInput + `=${answer}`);
    if (storedLog.length == 6){
        storedLog.shift();
    }

    storedLog.forEach((line) =>
    logScreen.innerHTML += `${line} <br>`);
}


function addValue(digit){
    storedInput += digit;
    updateInputDisplay();
    console.log(storedInput);
}


function addOperator(operator){
    if (storedOperator) return;

    if (storedInput){
        firstDigit = parseInt(storedInput);
    }

    storedInput += operator.innerHTML.replace(' ', '');
    storedOperator = storedInput.slice(-1);

    updateInputDisplay();
    console.log(storedOperator);
    
}

function equals(){
    if (!firstDigit || !storedOperator || !storedInput) return;

    if (storedOperator != 'squareRoot'){
        secondDigit = 
        parseInt(storedInput.slice(storedInput.indexOf(storedOperator) +1));
    }

    let answer = calculation(firstDigit, secondDigit, storedOperator);
    updateLogDisplay(answer);
    
    storedInput = answer;
    updateInputDisplay();

    console.log(`Calculating result of 
    ${firstDigit} ${storedOperator} ${secondDigit}`)

    firstDigit = storedInput;
    storedOperator = undefined;
}

function calculation(firstDigit, secondDigit=undefined, operator){
    if (operator == '+'){
        return firstDigit + secondDigit;
    }
    if (operator == '-'){
        return firstDigit - secondDigit;
    }
    if (operator == 'x'){
        return firstDigit * secondDigit;
    }
    if (operator == '/'){
        return firstDigit / secondDigit;
    }
    if (operator == '^'){
        return firstDigit ** secondDigit;
    }
    if (operator == '√'){
        return Math.sqrt(firstDigit);
        console.log("square root");
    }
}

// Clear all variables used for calculation and input display, and require
// that the next input be a number (not an operator)
function clear(){
    storedInput     = '';
    storedLog             = [];
    storedOperator  = undefined;
    firstDigit      = undefined;
    secondDigit     = undefined;

    inputScreen.innerHTML = storedInput;
    console.log("Screen cleared");
}

function backspace(){
    if (storedOperator){
        storedOperator = undefined;
    }
    storedInput = storedInput.slice(0, -1);
    updateInputDisplay();
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





