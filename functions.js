"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwo = getTwo;
exports.splitStringIfValid = splitStringIfValid;
var operations = ['+', '-', ':', '*'];
function getTwo() {
    return 2;
}
function splitStringIfValid(stringToValidate) {
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
    for (var _i = 0, stringToValidate_1 = stringToValidate; _i < stringToValidate_1.length; _i++) {
        var char = stringToValidate_1[_i];
        if (/\s/.test(char))
            continue;
        if (state === parserState.start) {
            if (operations.indexOf(char) > -1) {
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            if (char === "(") {
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            state = parserState.error;
            break;
        }
        if (state === parserState.operation) {
            if (!isNaN(parseInt(char))) {
                state = parserState.operand1;
                splittedString.push(char);
                continue;
            }
            if (char === "(") {
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            state = parserState.error;
            break;
        }
        if (state === parserState.operand1) {
            if (!isNaN(parseInt(char))) {
                state = parserState.operand2;
                splittedString.push(char);
                continue;
            }
            if (char === "(") {
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            if (operations.indexOf(char) > -1) {
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            state = parserState.error;
            break;
        }
        if (state === parserState.operand2) {
            if (char === ")") {
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
            if (char === "(") {
                bracketsCount++;
                continue;
            }
            if (operations.indexOf(char) > -1) {
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            state = parserState.error;
            break;
        }
        if (state === parserState.bracketClose) {
            if (char === ")") {
                bracketsCount--;
                if (bracketsCount < 0)
                    break;
                continue;
            }
            if (!isNaN(parseInt(char))) {
                state = parserState.operand2;
                splittedString.push(char);
                continue;
            }
            if (char === "(") {
                bracketsCount++;
                state = parserState.bracketOpen;
                continue;
            }
            state = parserState.error;
            break;
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
