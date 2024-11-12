"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwo = getTwo;
exports.splitStringIfValid = splitStringIfValid;
exports.calculateFromArr = calculateFromArr;
var operations = ['+', '-', '/', '*'];
function getTwo() {
    return 2;
}
function splitStringIfValid(input) {
    var splittedString = [];
    var bracketsCount = 0;
    var parserState;
    (function (parserState) {
        parserState[parserState["start"] = 0] = "start";
        parserState[parserState["stop"] = 1] = "stop";
        parserState[parserState["error"] = 2] = "error";
        parserState[parserState["operation"] = 3] = "operation";
        parserState[parserState["operand1"] = 4] = "operand1";
        parserState[parserState["operand2"] = 5] = "operand2";
        parserState[parserState["bracketOpen"] = 6] = "bracketOpen";
        parserState[parserState["bracketClose"] = 7] = "bracketClose";
    })(parserState || (parserState = {}));
    var state = parserState.start;
    for (var i = 0; i < input.length; i++) {
        {
            if (/\s/.test(input[i]))
                continue;
            if (state === parserState.start) {
                if (operations.indexOf(input[i]) > -1) {
                    splittedString.push(input[i]);
                    state = parserState.operation;
                    continue;
                }
                if (input[i] === "(") {
                    state = parserState.bracketOpen;
                    bracketsCount++;
                    continue;
                }
                state = parserState.error;
                break;
            }
            if (state === parserState.operation) {
                if (!isNaN(parseInt(input[i]))) {
                    state = parserState.operand1;
                    var nubmerEndIndex = getNumberEndIndex(i, input);
                    splittedString.push(input.substring(i, nubmerEndIndex));
                    i = nubmerEndIndex - 1;
                    continue;
                }
                if (input[i] === "(") {
                    state = parserState.bracketOpen;
                    bracketsCount++;
                    continue;
                }
                state = parserState.error;
                break;
            }
            if (state === parserState.operand1) {
                if (!isNaN(parseInt(input[i]))) {
                    state = parserState.operand2;
                    var nubmerEndIndex = getNumberEndIndex(i, input);
                    splittedString.push(input.substring(i, nubmerEndIndex));
                    i = nubmerEndIndex - 1;
                    continue;
                }
                if (input[i] === "(") {
                    state = parserState.bracketOpen;
                    bracketsCount++;
                    continue;
                }
                if (operations.indexOf(input[i]) > -1) {
                    splittedString.push(input[i]);
                    state = parserState.operation;
                    continue;
                }
                state = parserState.error;
                break;
            }
            if (state === parserState.operand2) {
                if (input[i] === ")") {
                    state = parserState.bracketClose;
                    bracketsCount--;
                    if (bracketsCount < 0)
                        break;
                    continue;
                }
                state = parserState.error;
                break;
            }
            if (state === parserState.bracketOpen) {
                if (input[i] === "(") {
                    bracketsCount++;
                    continue;
                }
                if (operations.indexOf(input[i]) > -1) {
                    splittedString.push(input[i]);
                    state = parserState.operation;
                    continue;
                }
                state = parserState.error;
                break;
            }
            if (state === parserState.bracketClose) {
                if (input[i] === ")") {
                    bracketsCount--;
                    if (bracketsCount < 0)
                        break;
                    continue;
                }
                if (!isNaN(parseInt(input[i]))) {
                    state = parserState.operand2;
                    var nubmerEndIndex = getNumberEndIndex(i, input);
                    splittedString.push(input.substring(i, nubmerEndIndex));
                    i = nubmerEndIndex - 1;
                    continue;
                }
                if (input[i] === "(") {
                    bracketsCount++;
                    state = parserState.bracketOpen;
                    continue;
                }
                state = parserState.error;
                break;
            }
        }
    }
    if (bracketsCount !== 0) {
        console.log("\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043A\u043E\u0431\u043E\u043A: ".concat(bracketsCount));
        return [];
    }
    if (state === parserState.operand2 || state === parserState.bracketClose)
        state = parserState.stop;
    if (state !== parserState.stop) {
        console.log("Ошибка при разборе строки");
        return [];
    }
    return splittedString;
}
// export function splitStringIfValid(stringToValidate: string): Array<string>
// {
//     const splittedString: Array<string> = [];
//     let bracketsCount = 0;
//     enum parserState {
//         start, stop, error,
//         operation, operand1, operand2,
//         bracketOpen, bracketClose,
//     }
//     let state = parserState.start;
//     for(let char of stringToValidate)
//     {
//         if (/\s/.test(char))
//             continue;
//         if (state === parserState.start){
//             if (operations.indexOf(char) > -1){
//                 splittedString.push(char);
//                 state = parserState.operation;
//                 continue;
//             }
//             if (char === "("){
//                 state = parserState.bracketOpen;
//                 bracketsCount++;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//         if (state === parserState.operation){
//             if (!isNaN(parseInt(char))){
//                 state = parserState.operand1;
//                 splittedString.push(char);
//                 continue;
//             }
//             if (char === "("){
//                 state = parserState.bracketOpen;
//                 bracketsCount++;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//         if (state === parserState.operand1){
//             if (!isNaN(parseInt(char))){
//                 state = parserState.operand2;
//                 splittedString.push(char);
//                 continue;
//             }
//             if (char === "("){
//                 state = parserState.bracketOpen;
//                 bracketsCount++;
//                 continue;
//             }
//             if (operations.indexOf(char) > -1){
//                 splittedString.push(char);
//                 state = parserState.operation;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//         if (state === parserState.operand2){
//             if (char === ")"){
//                 state = parserState.bracketClose;
//                 bracketsCount--;
//                 if (bracketsCount < 0)
//                     break;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//         if (state === parserState.bracketOpen){
//             if (char === "("){
//                 bracketsCount++;
//                 continue;
//             }
//             if (operations.indexOf(char) > -1){
//                 splittedString.push(char);
//                 state = parserState.operation;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//         if (state === parserState.bracketClose) {
//             if (char === ")"){
//                 bracketsCount--;
//                 if (bracketsCount < 0)
//                     break;
//                 continue;
//             }
//             if (!isNaN(parseInt(char))){
//                 state = parserState.operand2;
//                 splittedString.push(char);
//                 continue;
//             }
//             if (char === "("){
//                 bracketsCount++;
//                 state = parserState.bracketOpen;
//                 continue;
//             }
//             state = parserState.error;
//             break;
//         }
//     }
//     if (bracketsCount !== 0)
//     {
//         console.log(`Неправильное количество скобок: ${bracketsCount}`)
//         return [];
//     }
//     if (state === parserState.operand2 || state === parserState.bracketClose)
//         state = parserState.stop;
//     if (state !== parserState.stop){
//         console.log("Ошибка при разборе строки")
//         return [];
//     }
//     return splittedString;
// }
function calculateFromArr(splittedString) {
    if (splittedString.length === 0)
        return NaN;
    var operationsStack = [];
    var operandsStack = [];
    var firstOperandParsed = false;
    var secondOperandParsed = false;
    for (var _i = 0, splittedString_1 = splittedString; _i < splittedString_1.length; _i++) {
        var item = splittedString_1[_i];
        if (isOperation(item)) {
            operationsStack.push(item);
            firstOperandParsed = secondOperandParsed = false;
            continue;
        }
        operandsStack.push(parseInt(item));
        if (!firstOperandParsed) {
            firstOperandParsed = true;
            continue;
        }
        processStacks(operationsStack, operandsStack);
    }
    if (operandsStack.length !== 1 || operationsStack.length !== 0) {
        console.log("Operands length must be 1 but it is ".concat(operandsStack.length));
        console.log("Operations length must be 0 but it is ".concat(operationsStack.length));
        return NaN;
    }
    return operandsStack.pop();
}
function isOperation(char) {
    return operations.indexOf(char) >= 0;
}
function calc(operand1, operation, operand2) {
    if (operation === '+')
        return operand1 + operand2;
    if (operation === "-")
        return operand1 - operand2;
    if (operation === '*')
        return operand1 * operand2;
    if (operation === '/')
        return operand1 / operand2;
    return NaN;
}
function processStacks(operationsStack, operandsStack) {
    var result = NaN;
    var limit = operandsStack.length;
    var i = 0;
    while (operandsStack.length !== 1 && operationsStack.length !== 0) {
        var operand2 = operandsStack.pop();
        var operand1 = operandsStack.pop();
        var operation = operationsStack.pop();
        result = calc(operand1, operation, operand2);
        if (!Number.isFinite(result)) {
            console.log('Is Finite');
            break;
        }
        operandsStack.push(result);
        i++;
        if (i > limit) {
            console.log("Infinite loop");
            break;
        }
    }
}
function getNumberEndIndex(i, input) {
    var numberEndIndex = i + 1;
    if (numberEndIndex === input.length || !/\d/.test(input.at(numberEndIndex)))
        return numberEndIndex;
    while (numberEndIndex + 1 !== input.length && /\d/.test(input.at(numberEndIndex + 1)))
        numberEndIndex++;
    numberEndIndex++;
    return numberEndIndex;
}
// function splitStringIfValid(stringToValidate: string): Array<string>
// {
//     const splittedString: Array<string> = [];
//     let bracketsCount = 0;
//     for(let char of stringToValidate)
//     {
//         if (/\s/.test(char))
//             continue;
//         console.log(`char is: ${char}`);
//         if (char === '(')
//         {
//             bracketsCount++;
//             splittedString.push(char);
//             continue;
//         }
//         if (char === ')')
//         {
//             bracketsCount--;
//             if (bracketsCount < 0)
//                 break;
//             splittedString.push(char);
//             continue;
//         }
//         if (bracketsCount < 0)
//             break;
//         if (isNaN(parseInt(char, 10)))
//         {
//             if (operations.indexOf(char) > -1)
//             {
//                 splittedString.push(char);
//                 continue;
//             }
//             console.log(`Недопустимый символ ${char}`);
//             return [];
//         }
//         splittedString.push(char);
//     }
//     if (bracketsCount !== 0)
//     {
//         console.log("Неправильное количество скобок")
//         return [];
//     }
//     return splittedString;
// }
