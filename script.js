////////////////////////////////////////
////////// DECLARE VARIABLES //////////
//////////////////////////////////////

const digits        = document.querySelectorAll(".digit");
const operators     = document.querySelectorAll(".operator");

const clearButton   = document.getElementById("clear");
const deleteButton  = document.getElementById("delete");
const equalButton   = document.getElementById("equal");

const logScreen     = document.getElementById("displayScreen");
const inputScreen   = document.getElementById("inputScreen");


let storedLog       = [];
let storedInput     = '';
let storedOperator  = undefined;

let firstDigit      = undefined;
let secondDigit     = undefined;
let answer          = undefined;

let nextInputClears = false;
let softClear       = false;

////////////////////////////////////////
////////// DECLARE FUNCTIONS //////////
//////////////////////////////////////

// TODO: Change parseInt to floats and round the numbers to reasonable length
//       Add decimal point functionality (limit to one per digit input)

function updateInputDisplay(){
    inputScreen.innerHTML = storedInput;
}


function updateLogDisplay(answer){
    logScreen.innerHTML = '';

    storedLog.push(storedInput + ` = ${answer}`);
    if (storedLog.length == 6){
        storedLog.shift();
    }

    storedLog.forEach((line) =>
    logScreen.innerHTML += `${line} <br>`);
}


function addValue(digit){
    if (nextInputClears == true){
        softClear = true;
        clear();

        softClear = false;
        nextInputClears = false;
    }

    // If new digit is entered after getting an answer, replace answer
    // with the next digit instead of tacking it on 
    if (storedInput == answer){
        storedInput = '';
        firstDigit = undefined;
    }

    storedInput += digit;
    updateInputDisplay();

    // console.log(storedInput);
}


function addOperator(operator){
    if (nextInputClears == true){
        softClear = true;
        clear();

        softClear = false;
        nextInputClears = false;
        return
    }

    if (storedOperator){
        if (storedInput.slice(-1) == storedOperator){
            return
        }
        else {
            equals();
        }
    }

    if (storedInput){
        firstDigit = parseFloat(storedInput);
    }

    storedInput += operator.value;
    storedOperator = operator.value;

    updateInputDisplay();

    // console.log(storedOperator);
    
}


function equals(){
    if (!firstDigit || !storedOperator || !storedInput) return;

    if (storedOperator != 'squareRoot'){
        secondDigit = 
        parseFloat(storedInput.slice(storedInput.indexOf(storedOperator) +1));
    }

    answer = calculation(firstDigit, secondDigit, storedOperator);

    // If answer has decimal, round it to 8 places and strip trailing 0s
    if (answer % 1 != 0){
        answer = answer.toFixed(8).replace(/0+$/, "");
    }

    if (answer == Infinity){
        answer = "Error! Number too large";
        updateLogDisplay("error");
        nextInputClears = true;
    }
    if (answer == null){
        answer = "Cannot divide by 0"
        updateLogDisplay("error");
        nextInputClears = true;
    }
    else {
        updateLogDisplay(answer);
    }

    storedInput = answer;
    updateInputDisplay();

    // console.log(`Calculating result of 
    // ${firstDigit} ${storedOperator} ${secondDigit}`)

    firstDigit = storedInput;
    storedOperator = undefined;
}


function calculation(firstDigit, secondDigit, operator){
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
        if (secondDigit == 0){
            return null;
        }
        else {
            return firstDigit / secondDigit;
        }
    }
    if (operator == '^'){
        return firstDigit ** secondDigit;
    }
    if (operator == '√'){
        return Math.sqrt(firstDigit);
    }
}


function clear(){
    storedInput     = '';
    storedOperator  = undefined;
    firstDigit      = undefined;
    secondDigit     = undefined;

    inputScreen.innerHTML = storedInput;

    // Leave log displayed if clearing after an error
    if (softClear == false){
        storedLog   = [];
        logScreen.innerHTML = storedLog;
    }
}


function backspace(){
    if (storedOperator){
        if (storedInput.slice(-1) == storedOperator){
            storedOperator = undefined;
        }
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

clearButton.addEventListener('click',  clear);
deleteButton.addEventListener('click', backspace);
equalButton.addEventListener('click',  equals);





