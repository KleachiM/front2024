"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
var functions_1 = require("./functions");
var eq = "+ 2";
main(eq);
function evaluate(splittedInput) {
    splittedInput.forEach(function (e) { return console.log(e); });
    return 2;
}
function main(eq) {
    var splittedInput = (0, functions_1.splitStringIfValid)(eq);
    if (splittedInput.length == 0) {
        console.log("Невалидная строка");
        return;
    }
    var result = evaluate(splittedInput);
    console.log("\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(result));
}
