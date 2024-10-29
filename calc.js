var operations = ['+', '-', ':', '*'];
var eq = " (+ 2 2) ";
main(eq);
function splitStringIfValid(stringToValidate) {
    var splittedString = [];
    var bracketsCount = 0;
    for (var _i = 0, stringToValidate_1 = stringToValidate; _i < stringToValidate_1.length; _i++) {
        var char = stringToValidate_1[_i];
        if (/\s/.test(char))
            continue;
        console.log("char is: ".concat(char));
        if (char === '(') {
            bracketsCount++;
            splittedString.push(char);
            continue;
        }
        if (char === ')') {
            bracketsCount--;
            if (bracketsCount < 0)
                break;
            splittedString.push(char);
            continue;
        }
        if (bracketsCount < 0)
            break;
        if (isNaN(parseInt(char, 10))) {
            if (operations.indexOf(char) > -1) {
                splittedString.push(char);
                continue;
            }
            console.log("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B ".concat(char));
            return [];
        }
        splittedString.push(char);
    }
    if (bracketsCount !== 0) {
        console.log("Неправильное количество скобок");
        return [];
    }
    return splittedString;
}
function evaluate(splittedInput) {
    splittedInput.forEach(function (e) { return console.log(e); });
    return 2;
}
function main(eq) {
    var splittedInput = splitStringIfValid(eq);
    if (splittedInput.length == 0) {
        console.log("Невалидная строка");
        return;
    }
    var result = evaluate(splittedInput);
    console.log("\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(result));
}
